import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NodeService } from '../service/node.service';
import { IChipList } from './IJob';
import { isArray, keyBy } from 'lodash-es';
import { AmapService } from '../service/amap.service';
import { AMapState } from '../mobx/amap/AMapState';
import { TitleService } from '../service/title.service';
import { RouteService } from '../service/route.service';
import { Params, ActivatedRoute } from '@angular/router';
import { AppState } from '../mobx/AppState';
const feature = [
  {
    title: '徽章',
    body: '在一个小部件上方显示数值',
    img: '/assets/images/badge.scene.png'
  }, {
    title: '按钮',
    body: '几种形状的按钮和颜色，可以更好的突出您的品牌',
    img: '/assets/images/button.scene.png'
  }, {
    title: '表单字段',
    body: '改进了表单组件，增进用户体验和无障碍沟通',
    img: '/assets/images/form-field.scene.png'
  }, {
    title: '布局',
    body: '通过拖动的方式管理你的页面布局，灵活的创建各种营销着陆页',
    img: '/assets/images/grid-list.scene.png'
  }, {
    title: '菜单',
    body: '紧凑的菜单面板，引导用户到达页面',
    img: '/assets/images/menu.scene.png'
  }
]
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  nodes: any[];
  relation: any;
  included: any;
  positon: object = {};
  regions: any;
  loading: boolean;
  AMap: any;
  geocoder: any;
  selectedId: string;
  selected: any;
  feature = feature;

  show = false;
  constructor(
    private apiService: ApiService,
    private nodeService: NodeService,
    private amapService: AmapService,
    public amapState: AMapState,
    private appState: AppState,
    private titleService: TitleService,
    private routerService: RouteService,
    private route: ActivatedRoute
  ) {
    this.nodes = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.titleService.setTitle('内推职位列表');
    this.getJobsNodes();
    this.route.queryParamMap.subscribe((res) => {
      this.paramsInit(res);
    });
  }

  paramsInit(params: Params): void {
    this.selectedId = params.params.id;
  }

  getJobsNodes(): void {
    // 以下参数没有顺序关系
    // fields[{{type}}] type 为该实体类型
    // include 为 relationships 相关资源，支持嵌套如company,company.log
    const params = [
      'fields[node--job]=drupal_internal__nid,title,created,changed,body,deadline,number,salary,work_experience,skill,education,company',
      'include=skill,education,company,company.logo',
      'fields[node--company]=title,address,phone,welfare,logo',
      'fields[taxonomy_term--skill]=name',
      'fields[taxonomy_term--education]=name',
      'fields[file--file]=uri',
    ].join('&');

    this.nodeService.getNodes('job', params).subscribe((res) => {
      this.loading = false;
      this.nodes = res.data;
      this.included = res.included;
      if (isArray(res.included)) {
        this.relation = keyBy(res.included, 'id');
        this.initMap(res.included);
      }
    });
  }

  initMap(included: any): void {
    this.amapService.load().subscribe((AMap: any) => {
      this.AMap = AMap;
      this.geocoder = new AMap.Geocoder({
        city: this.appState?.config?.amap?.city,
      });
      this.getPosition(included);
    });
  }

  getPosition(included: any): void {
    const companys = included.filter((item: any) => {
      return item.type === 'node--company';
    });

    if (companys.length > 0) {
      companys.forEach((item: any, index: number) => {
        const address = item.attributes.address.address_line1;
        this.geocoder.getLocation(address, (status: any, result: any) => {
          if (status === 'complete' && result.info === 'OK') {
            const location = result.geocodes[0].location;
            this.relation[item.id].position = [location.lng, location.lat];
            if (companys.length === index + 1) {
              this.amapState.position$.next(true);
            }
          }
        });
      });
    }
  }

  getWelfare(lists: string[]): IChipList[] {
    return lists
      .map((list) => {
        return {
          color: 'primary',
          label: list,
        };
      })
      .slice(0, 4);
  }

  onSelected(obj: any): void {
    this.selected = obj.item;
    this.selectedId = obj.item.attributes.drupal_internal__nid;
    this.amapState.markers$.next(obj);
    const query: Params = { id: this.selectedId };
    this.routerService.updateQueryParams(query);
  }
}
