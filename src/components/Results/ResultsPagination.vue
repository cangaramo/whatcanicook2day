<template>
    <div class="pagination mt-5">
        <!-- Previous page -->
        <button
            class="changePage"
            @click="previousPage"
            v-if="current_page != 1"
        >
            <i class="fas fa-chevron-left"></i>
        </button>
        <button
            v-for="page in pagesArray"
            :key="page"
            @click="changePage(page)"
            :class="[{ active: current_page == page }, 'page']"
        >
            {{ page }}
        </button>
        <!-- Next page -->
        <button
            class="changePage"
            @click="nextPage"
            v-if="current_page != this.pages"
        >
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        pages: Number
    },
    data() {
        return {
            current_page: 1,
            total: this.pages
        }
    },
    methods: {
        previousPage() {
            this.current_page -= 1
            //Do something
            this.$emit('updatePage', this.current_page)
        },
        nextPage() {
            this.current_page += 1
            //Do something
            this.$emit('updatePage', this.current_page)
        },
        changePage(page) {
            this.current_page = page
            //Do something
            this.$emit('updatePage', this.current_page)
        }
    },
    computed: {
        pagesArray() {
            var pagesArr = []
            var first
            var last
            if (this.pages > 5) {
                if (this.current_page == 1) {
                    // First
                    first = 1
                    last = 5
                } else if (this.current_page == 2) {
                    //Second
                    first = 2
                    last = 6
                } else if (this.current_page == this.total) {
                    // Last
                    first = this.current_page - 4
                    last = this.current_page
                } else if (this.current_page == this.total - 1) {
                    // Second to last
                    first = this.current_page - 3
                    last = this.current_page + 1
                } else {
                    // Rest
                    first = this.current_page - 2
                    last = this.current_page + 2
                }
            } else {
                //Less than 5 pages
                first = 1
                last = this.pages
            }
            for (let i = first; i <= last; i++) {
                pagesArr.push(i)
            }
            return pagesArr
        }
    }
}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

.pagination {
    display: flex;
    justify-content: center;
    button {
        border-radius: 5px;
        border: 1px solid #e0e0e0;
        color: $purple;
        height: 30px;
        width: 30px;
        text-align: center;
        margin: 0 4px;
        &:hover {
            background: $light_pink;
            border: 1px solid $light_pink;
            color: white;
        }
        &:focus {
            outline: none;
        }
    }
    .changePage {
        i {
            margin-top: 5px;
        }
    }
    .page {
        font-size: 14px;
        &.active {
            border: 1px solid $pink;
            color: white;
            background: $pink;
            box-shadow: 0px 0px 3px 0px #c06c84;
        }
    }
}
</style>
