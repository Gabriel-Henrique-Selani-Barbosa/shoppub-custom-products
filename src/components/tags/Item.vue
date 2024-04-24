<script setup lang="ts">
import { ETagType, IStep, IProductView } from "@/models";

interface TagItemProps {
  productView: IProductView<any>;
  noScale: boolean;
  steps: IStep<any, any, any>[];
}

const props = defineProps<TagItemProps>();
</script>

<template>
  <TagsRectangularSmall :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularSmall" />
  <TagsRectangularMedium :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularMedium" />
  <TagsRectangularLarge :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularLarge" />
  <TagsRectangularClothing :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularClothing" />
  <TagsShoesTag :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.ShoesTag" />
  <TagsSquareTag :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.SquareTag" />
  <TagsRoundTag :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RoundTag" />
  <TagsRectangularSlimClothing :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularSlimClothing" />
  <TagsSquareClothing :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.SquareClothing" />
  <TagsRound :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.Round" />
  <TagsRectangularBracelet :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularBracelet" />
  <TagsRectangularBirthday :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularBirthday" />
  <TagsRectangularGift :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularGift" />
  <TagsSquareGift :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.SquareGift" />
  <TagsSchoolDraw :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.SchoolDraw" /> 
  <TagsRectangularSchool :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularSchool" />
  <TagsRectangularSchool :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.SchoolLight" />
  <TagsRectangularSchool :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.SchoolDark" />
  <TagsRectangularMediumPicture :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularMediumPicture" />
  <TagsRectangularLargePicture :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularLargePicture" />
  <TagsRectangularClothingPicture :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RectangularClothingPicture" />
  <TagsShoesTagPicture :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.ShoesTagPicture" />
  <TagsRoundTagPicture :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RoundTagPicture" />
  <TagsSquareTagPicture :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.SquareTagPicture" />
  <TagsRoundPicture :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.RoundPicture" />
  <TagsSquareClothingPicture :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.SquareClothingPicture" />
  <TagsSchoolPicture :noScale="noScale" :field="steps" v-if="props.productView?.type === ETagType.SchoolPicture" />
</template>
