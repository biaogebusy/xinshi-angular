import { NgModule } from '@angular/core';
import { LightboxModule } from 'ngx-lightbox';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { ShareModule } from '../../share/share.module';
import { MatChipsModule } from '@angular/material/chips';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CountToModule } from 'angular-count-to';

import { BgComponent } from './bg/bg.component';
import { ImgComponent } from './img/img.component';
import { BoxComponent } from './box/box.component';
import { MapComponent } from './map/map.component';
import { TabComponent } from './tab/tab.component';
import { LinkComponent } from './link/link.component';
import { CardComponent } from './card/card.component';
import { TextComponent } from './text/text.component';
import { TitleComponent } from './title/title.component';
import { InputComponent } from './input/input.component';
import { PanelComponent } from './panel/panel.component';
import { SwiperComponent } from './swiper/swiper.component';
import { SpacerComponent } from './spacer/spacer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ChipListComponent } from './chip-list/chip-list.component';
import { LineYearComponent } from './line-year/line-year.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BtnAnimateComponent } from './btn-animate/btn-animate.component';
import { FeatureBoxComponent } from './feature-box/feature-box.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { NumberAnimateComponent } from './number-animate/number-animate.component';
import { DynamicWidgetsComponent } from './dynamic-widgets/dynamic-widgets.component';

import { SafeHtmlPipe } from '../../pipe/safe-html.pipe';
import { IconComponent } from './icon/icon.component';
import { ProgressGroupComponent } from './progress-group/progress-group.component';
import { MediaListComponent } from './media/media-list/media-list.component';
import { MediaObjectComponent } from './media/media-object/media-object.component';
import { MediaObjectGroupComponent } from './media/media-object-group/media-object-group.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};

const components = [
  BgComponent,
  ImgComponent,
  MapComponent,
  BoxComponent,
  TextComponent,
  LinkComponent,
  TabComponent,
  CardComponent,
  IconComponent,
  TitleComponent,
  PanelComponent,
  InputComponent,
  SwiperComponent,
  SpacerComponent,
  SpinnerComponent,
  ChipListComponent,
  TextareaComponent,
  LineYearComponent,
  ContactUsComponent,
  BtnAnimateComponent,
  FeatureBoxComponent,
  BreadcrumbComponent,
  TestimonialComponent,
  DropdownMenuComponent,
  NumberAnimateComponent,
  DynamicWidgetsComponent,
  SidebarComponent,
  MediaListComponent,
  MediaObjectComponent,
  MenuListComponent,
  PaginationComponent,
  ProgressBarComponent,
  ProgressGroupComponent,
  SafeHtmlPipe,
];

@NgModule({
  declarations: [...components, MediaObjectGroupComponent],
  imports: [
    MatChipsModule,
    ShareModule,
    SwiperModule,
    LightboxModule,
    CountToModule,
  ],
  exports: [...components],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class WidgetsModule {}
