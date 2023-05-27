<template lang="pug">
.rating-items
  .rating-items__list
    a.rating-items__item(
      v-for='(item, index) in items',
      :href='item.url',
      target='_blank',
      data-analyzed-element='rating-items-item',
      :data-analyzed-element-data='item.dataForAnalyzed'
    )
      .rating-items__img-box(:style='`background-color: ${item.color}`')
        img.rating-items__img(
          v-lazy='item.logoImg',
          :alt='item.hostname',
          :src='$configApp.imageStub'
        )
      .rating-items__info
        .rating-items__name-box
          .rating-items__name {{ item.name[$langDefault()] }}
        .rating-items__hostname {{ item.hostname }}
        .rating-items__labels(v-if='labels.length')
          app-label-rating(
            v-for='labelId of item.labelsIds',
            :color='labelsMap[labelId].color',
            :text='labelsMap[labelId].name[$langDefault()]'
          )
</template>

<script lang="ts">
import { LabelType, RatingItemType } from '@/types';

type LabelsMapType = {
  [key: LabelType['labelId']]: LabelType;
};

export default defineComponent({
  props: {
    // labels
    labels: {
      type: Array as () => LabelType[],
      default: () => {
        return [];
      },
    },

    // rating items
    items: {
      type: Array as () => RatingItemType[],
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      labelsMap: {} as LabelsMapType,
    };
  },
  created() {
    for (let label of this.labels as LabelType[]) {
      this.labelsMap[label.labelId] = label;
    }
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
    border: 1px dashed var(--app-color-primary)
    @media (max-width: $app-screen-xl)
      width: 50%
    @media (max-width: $app-screen-md)
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
    color: var(--app-color-text-regular)
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
    color: var(--app-color-primary)
    margin-bottom: 10px
    font-weight: 700
    width: 100%
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>
