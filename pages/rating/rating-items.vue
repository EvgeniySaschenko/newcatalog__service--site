<template lang="pug">
.rating-items
  .rating-items__list
    a.rating-items__item(
      v-for='(item, index) in items',
      :href='item.url',
      target='_blank',
      @click='gtmPush(index)'
    )
      .rating-items__img-box(:style='`background-color: ${item.color}`')
        img.rating-items__img(:src='item.logoImg', :alt='item.hostname')
      .rating-items__info
        .rating-items__name-box
          .rating-items__name {{ item.name[$lang] }}
        .rating-items__hostname {{ item.hostname }}

        .rating-items__labels-list(v-if='labels.length')
          .rating-items__label.label-rating(
            v-for='labelId of item.labelsIds',
            :style='`background-color: ${labelsMap[labelId].color}`'
          ) {{ `#${labelsMap[labelId].name[$lang]}` }}
</template>

<script lang="ts">
import { LabelType, RatingItemType } from '@/types';

type LabelsMapType = {
  [key: LabelType['labelId']]: LabelType;
};

export default defineNuxtComponent({
  data() {
    return {
      labelsMap: {} as LabelsMapType,
    };
  },
  props: {
    // labels
    labels: {
      type: Array,
      default: () => {
        return [];
      },
    },

    // rating items
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  created() {
    for (let label of this.labels as LabelType[]) {
      this.labelsMap[label.labelId] = label;
    }
  },

  methods: {
    gtmPush(index: number) {
      let rating = this.items[index] as RatingItemType;

      this.$gtmPush({
        event: 'rating-item.click',
        ratingItemId: rating.ratingItemId,
        ratingId: rating.ratingId,
        siteId: rating.siteId,
        elementsType: this.$config.elementsTypes['rating-items__item'],
        timestamp: Date.now(),
        userAgent: window.navigator.userAgent,
        isTouchDevice: this.$screen.isTouchDevice(),
        screen: { height: window.screen.height, width: window.screen.width },
      });
    },
  },
});
</script>
<style lang="sass" scoped>
@import '@/assets/style/_variables.sass'

.rating-items
  margin-bottom: 15px
  &__list
    display: flex
    flex-wrap: wrap
    width: 100%
  &__item
    width: 33.33%
    border: 1px dashed $app-primary-color
    @include screen-lg()
      width: 50%
    @include screen-md()
      width: 50%
    @include screen-sm()
      width: 100%
    @include screen-xs()
      width: 100%
  &__img-box
    display: flex
    align-items: center
    justify-content: center
    height: 120px
    padding: 10px
  &__img
    max-width: 100%
    max-height: 100%
  &__info
    padding: 10px
    text-align: center
  &__name
    color: #000000
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden
    line-height: 1.3
  &__name-box
    height: 45px
    margin-bottom: 10px
    padding: 0 10px
  &__hostname
    color: $app-primary-color
    margin-bottom: 10px
    font-weight: 700
    width: 100%
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>
