import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../service/node.service';
import { isArray, keyBy, map } from 'lodash-es';
import { IShowcase2v1 } from '../../uiux/combs/ICombs';
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
})
export class CaseComponent implements OnInit {
  content: IShowcase2v1;
  relations: any;
  loading = false;
  constructor(private nodeService: NodeService) {
    this.content = {
      title: 'Drupal 国内案例',
      subTitle: '欢迎分享 Drupal 优秀的数字创新体验',
      elements: [],
    };
  }

  ngOnInit(): void {
    this.getCases();
  }

  getCases(): void {
    this.loading = true;
    const params = [
      'fields[node--case]=title,created,field_image,field_tags',
      'include=field_image,field_tags',
      'fields[file--file]=uri',
      'fields[taxonomy_term--industry]=name',
    ].join('&');

    this.nodeService.getNodes('case', params).subscribe((res) => {
      this.loading = false;
      console.log(res);
      this.relations = keyBy(res.included, 'id');
      this.content.elements = map(res.data, (item) => {
        return {
          body: item.attributes.created,
          img: this.relations[item.relationships.field_image.data.id].attributes
            .uri.url,
          link: {
            label: item.attributes.title,
            href: item.links.self.href,
          },
        };
      });
    });
  }
}