import Vue from 'vue'
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Page from '~/src/components/Templates/Page'

// import Accordion from '~/src/components/Modules/Accordion'
import AnchorList from '~/src/components/Modules/AnchorList'
import AttributeList from '~/src/components/Modules/AttributeList'
import AudioList from '~/src/components/Modules/AudioList'
import ASpot from '~/src/components/Modules/ASpot'
import Btn from '~/src/components/Elements/Btn'
import CardList from '~/src/components/Modules/CardList'
import Checklist from '~/src/components/Modules/Checklist'
import Cta from '~/src/components/Modules/Cta'
import FaqList from '~/src/components/Modules/FaqList'
import FeatureList from '~/src/components/Modules/FeatureList'
import FeaturedCardList from '~/src/components/Modules/FeaturedCardList'
import Footer from '~/src/components/Modules/Footer'
import Form from '~/src/components/Modules/Forms'
import FormEmbed from '~/src/components/Modules/FormEmbed'
import GuestProfileList from '~/src/components/Modules/GuestProfileList'
import HSRList from '~/src/components/Modules/HSRList'
import IconTextList from '~/src/components/Modules/IconTextList'
import IconTextListCollapse from '~/src/components/Modules/IconTextList/collapse'
import IFrame from '~/src/components/Modules/IFrame'
import Image from '~/src/components/Elements/Image'
import LogoList from '~/src/components/Modules/LogoList'
import Lightbox from '~/src/components/Modules/Lightbox'
import LinkList from '~/src/components/Modules/LinkList'
import MemberList from '~/src/components/Modules/MemberList'
import Metrics from '~/src/components/Modules/Metrics'
import Navigation from '~/src/components/Modules/Navigation'
import Person from '~/src/components/Types/Person'
import Process from '~/src/components/Modules/Process'
import RichText from '~/src/components/Modules/RichText'
import Row from '~/src/components/Modules/Row'
import Script from '~/src/components/Modules/Script'
import Quote from '~/src/components/Modules/Quote'
import QuoteList from '~/src/components/Modules/QuoteList'
import Slider from '~/src/components/Modules/Slider'
import Stats from '~/src/components/Modules/Stats'
import StaffList from '~/src/components/Modules/StaffList'
import Table from '~/src/components/Modules/Table/table'
import TableList from '~/src/components/Modules/Table/tableList'
import Tabs from '~/src/components/Modules/Tabs'
import Testimonials from '~/src/components/Modules/Testimonials'
import Timeline from '~/src/components/Modules/Timeline'
import TitleBlock from '~/src/components/Modules/TitleBlock'
import VerticalSteps from '~/src/components/Modules/VerticalSteps'
import VideoEmbed from '~/src/components/Modules/VideoEmbed'
import HeroText from '~/src/components/Modules/HeroText'
import HeroImage from '~/src/components/Modules/HeroImage'
import TimelineItem from '~/src/components/Modules/TimelineItem'
import FeatureQuote from '~/src/components/Modules/FeatureQuote'
import AccordionList from '~/src/components/Modules/AccordionList'
import RichTextImage from '~/src/components/Modules/RichTextImage'
import RichTextImageShadow from '~/src/components/Modules/RichTextImageShadow'
import NewsRooms from '~/src/components/Modules/NewsRooms'
import FancyTitle from '~/src/components/Modules/FancyTitle'
import IconList from '~/src/components/Modules/IconList'
import ImageCardRow from '~/src/components/Modules/ImageCardRow'
import HealthSolutionSlider from '~/src/components/Modules/HealthSolutionSlider'
import PlainImage from '~/src/components/Modules/PlainImage'
import ColumnText from '~/src/components/Modules/ColumnText'
import CtaImage from '~/src/components/Modules/CtaImage'
import StatisticsList from '~/src/components/Modules/StatisticsList'
import ProductList from '~/src/components/Modules/ProductList'
import AudioTextSlider from '~/src/components/Modules/AudioTextSlider'
import WideQuote from '~/src/components/Modules/WideQuote'
import CtaWhitepaper from '~/src/components/Modules/CtaWhitepaper'
import Resources from '~/src/components/Types/Resources'
import NewsTicker from '~/src/components/Modules/NewsTicker'
import ResourcesHubEmbed from '~/src/components/Modules/ResourcesHubEmbed'
import HeroImageSide from '~/src/components/Modules/HeroImageSide'
import FeatureSlider from '~/src/components/Modules/FeatureSlider'
import VerticalSlider from '~/src/components/Modules/VerticalSlider'
import ImageSlider from '~/src/components/Modules/ImageSlider'
import FeatureQuoteSlider from '~/src/components/Modules/FeatureQuoteSlider'
import NewsFeedLanding from '~/src/components/Modules/NewsFeedLanding'

import Takeover from '~/src/components/Modules/Takeover'

Vue.component('blok-page', Page)

// Vue.component('blok-accordion', Accordion)
Vue.component('blok-anchor-list', AnchorList)
Vue.component('blok-attribute-list', AttributeList)
Vue.component('blok-audio-list', AudioList)
Vue.component('blok-a-spot', ASpot)
Vue.component('blok-btn', Btn)
Vue.component('blok-card-list', CardList)
Vue.component('blok-checklist', Checklist)
Vue.component('blok-cta', Cta)
Vue.component('blok-faq-list', FaqList)
Vue.component('blok-feature-list', FeatureList)
Vue.component('blok-featured-card-list', FeaturedCardList)
Vue.component('blok-form', Form)
Vue.component('blok-hubspot-form', FormEmbed)
Vue.component('blok-guest-profile-list', GuestProfileList)
Vue.component('blok-footer', Footer)
Vue.component('blok-h-s-r-list', HSRList)
Vue.component('blok-icon-text-list', IconTextList)
Vue.component('blok-icon-text-list-collapse', IconTextListCollapse)
Vue.component('blok-iframe', IFrame)
Vue.component('blok-image', Image)
Vue.component('blok-link-list', LinkList)
Vue.component('blok-logo-list', LogoList)
Vue.component('blok-lightbox', Lightbox)
Vue.component('blok-member-list', MemberList)
Vue.component('blok-metrics', Metrics)
Vue.component('blok-navigation', Navigation)
Vue.component('blok-person', Person)
Vue.component('blok-process', Process)
Vue.component('blok-rich-text', RichText)
Vue.component('blok-row', Row)
Vue.component('blok-script', Script)
Vue.component('blok-quote', Quote)
Vue.component('blok-quote-list', QuoteList)
Vue.component('blok-slider', Slider)
Vue.component('blok-staff-list', StaffList)
Vue.component('blok-stats', Stats)
Vue.component('blok-step', BaseComponent)
Vue.component('blok-table', Table)
Vue.component('blok-table-list', TableList)
Vue.component('blok-tabs', Tabs)
Vue.component('blok-testimonials', Testimonials)
Vue.component('blok-timeline', Timeline)
Vue.component('blok-title-block', TitleBlock)
Vue.component('blok-vertical-steps', VerticalSteps)
Vue.component('blok-video-embed', VideoEmbed)
Vue.component('blok-hero-text', HeroText)
Vue.component('blok-hero-image', HeroImage)
Vue.component('blok-timeline-item', TimelineItem)
Vue.component('blok-feature-quote', FeatureQuote)
Vue.component('blok-accordion-list', AccordionList)
Vue.component('blok-rich-text-image', RichTextImage)
Vue.component('blok-rich-text-image-shadow', RichTextImageShadow)
Vue.component('blok-newsroom', NewsRooms)
Vue.component('blok-fancy-title', FancyTitle)
Vue.component('blok-icon-list', IconList)
Vue.component('blok-image-card-row', ImageCardRow)
Vue.component('blok-health-solution-slider', HealthSolutionSlider)
Vue.component('blok-plain-image', PlainImage)
Vue.component('blok-column-text', ColumnText)
Vue.component('blok-cta-image', CtaImage)
Vue.component('blok-statistics-list', StatisticsList)
Vue.component('blok-product-list', ProductList)
Vue.component('blok-audio-text-slider', AudioTextSlider)
Vue.component('blok-wide-quote', WideQuote)
Vue.component('blok-cta-whitepaper', CtaWhitepaper)
Vue.component('blok-resources', Resources)
Vue.component('blok-news-ticker', NewsTicker)
Vue.component('blok-resources-hub-embed', ResourcesHubEmbed)
Vue.component('blok-hero-image-side', HeroImageSide)
Vue.component('blok-feature-slider', FeatureSlider)
Vue.component('blok-vertical-slider', VerticalSlider)
Vue.component('blok-image-slider', ImageSlider)
Vue.component('blok-feature-quote-slider', FeatureQuoteSlider)
Vue.component('blok-news-feed-landing', NewsFeedLanding)

Vue.component('blok-takeover', Takeover)
