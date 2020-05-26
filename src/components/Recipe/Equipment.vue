<template>
    <div>
        <h4 class="my-4">Equipment</h4>
        <div v-for="equipment in equipments" :key="equipment.id" class="list">
            <div class="img-wrapper">
                <div
                    :style="
                        `background-image:url('https://spoonacular.com/cdn/equipment_250x250/${equipment.image}')`
                    "
                />
            </div>
            <div class="ml-4">
                <p class="name">
                    {{ capitaLizeLetter(equipment.name) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { myMixin } from '@/mixins/mixin.js'

export default {
    props: {
        equipments: Array
    },
    mixins: [myMixin]
}
</script>

<style></style>
