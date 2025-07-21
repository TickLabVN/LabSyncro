<script setup lang="ts">
import { debounce } from 'lodash-es';
import { categorySvc } from '~/services';
import type { CategoryDto } from '~~/shared/schemas';

definePageMeta({ middleware: ['permission'] });

const route = useRoute();
const categoryId = computed(() => {
  const id = route.query.categoryId;
  return id && typeof id === 'string' ? Number.parseInt(id) : null;
});
const search = ref('');
const searchValue = computed(() => {
  const q = route.query.q;
  return q && typeof q === 'string' ? q : null;
});
const setSearch = debounce((value) => {
  search.value = value;
}, 300);

const category = ref<CategoryDto | null>(null);
watch(categoryId, async () => {
  if (categoryId.value === null) return;
  category.value = await categorySvc.get(categoryId.value);
}, { immediate: true });

const allCategories = await categorySvc.getAll();

</script>

<template>
  <div class="mx-6 sm:mx-16 my-10">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <NuxtLink href="/" class="flex justify-center items-center text-lg">
            <Icon aria-hidden name="i-heroicons-home" />
          </NuxtLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <p class="font-semibold">/</p>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <NuxtLink class="text-normal font-bold underline text-black" :href="`/devices?categoryId=${categoryId}`">{{ category?.name ?? "Tất cả" }}</NuxtLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <main class="my-10">
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div>
          <div class="text-normal flex flex-col">
            <p class="bg-black text-white min-w-[190px] px-5 py-1">Danh mục</p>
            <NuxtLink
              :class="`relative text-left text-black min-w-[190px] px-5 py-1 pr-10 line-clamp-1 border-b border-b-slate-light ${categoryId === null ? 'bg-slate-light' : 'bg-white'}`"
              href="/devices">
              Tất cả
              <Icon v-if="categoryId === null" aria-hidden name="i-heroicons-check" class="absolute top-1.5 right-2" />
            </NuxtLink>
            <NuxtLink
               v-for="c in allCategories" :key="c.id.toString()"
              :class="`relative text-left text-black min-w-[190px] px-5 py-1 pr-10 line-clamp-1 border-b border-b-slate-light ${categoryId === c.id ? 'bg-slate-light' : 'bg-white'}`"
              :href="categoryId === c.id ? '/devices' : `/devices?categoryId=${c.id}`">
              {{ c.name }}
              <Icon 
                v-if="categoryId === c.id" 
                aria-hidden name="i-heroicons-check"
                class="absolute top-1.5 right-2" />
            </NuxtLink>
          </div>
        </div>
        <div class="flex-1 bg-white p-10">
          <div class="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8">
            <h2 class="text-2xl mb-2 sm:mb-0">
              {{ category?.name ?? "Tất cả thiết bị" }}
            </h2>
            <div v-if="!searchValue" class="relative items-center flex gap-4 mx-auto sm:mx-0">
              <input 
                :value="search" type="search" placeholder="Nhập tên thiết bị"
                class="border-gray-300 border rounded-sm p-2 pl-10 md:w-[350px] lg:w-[400px]"
                @input="(e) => setSearch(e.target?.value)">
              <Icon 
                aria-hidden class="absolute left-3 top-[12px] text-xl text-primary-dark"
                name="i-heroicons-magnifying-glass" />
            </div>
          </div>
          <DeviceGrid :category-id="categoryId" :search-text="search" />
        </div>
      </div>
    </main>
  </div>
</template>
