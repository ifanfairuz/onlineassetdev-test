<script setup lang="ts">
import { cn } from '@/lib/utils'
import Brand from '../Brand.vue'
import SidebarItem from './SidebarItem.vue'
import SidebarNav from './SidebarNav.vue'
</script>

<template>
  <aside
    :class="
      cn(
        'w-72 h-svh fixed flex flex-col',
        'z-100 bg-neutral-100 lg:bg-none lg:static -translate-x-72 lg:translate-x-0!',
        'transition-all duration-100 ease-in-out in-data-[sidebar=show]:translate-x-0',
      )
    "
  >
    <div class="flex-1 flex flex-col p-4 gap-4 w-72">
      <!-- brand -->
      <router-link to="/" class="hover:bg-neutral-200 rounded-md">
        <Brand />
      </router-link>

      <!-- navigation -->
      <SidebarNav>
        <SidebarItem url="/" title="Dashboard">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none">
                <path
                  fill="currentColor"
                  fill-opacity="0.16"
                  d="M8.4 15H5.6A1.6 1.6 0 0 0 4 16.6v2.8A1.6 1.6 0 0 0 5.6 21h2.8a1.6 1.6 0 0 0 1.6-1.6v-2.8A1.6 1.6 0 0 0 8.4 15m10-12h-2.8A1.6 1.6 0 0 0 14 4.6v2.8A1.6 1.6 0 0 0 15.6 9h2.8A1.6 1.6 0 0 0 20 7.4V4.6A1.6 1.6 0 0 0 18.4 3"
                />
                <path
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="1.5"
                  d="M8.4 3H5.6A1.6 1.6 0 0 0 4 4.6v4.8A1.6 1.6 0 0 0 5.6 11h2.8A1.6 1.6 0 0 0 10 9.4V4.6A1.6 1.6 0 0 0 8.4 3Zm0 12H5.6A1.6 1.6 0 0 0 4 16.6v2.8A1.6 1.6 0 0 0 5.6 21h2.8a1.6 1.6 0 0 0 1.6-1.6v-2.8A1.6 1.6 0 0 0 8.4 15Zm10-12h-2.8A1.6 1.6 0 0 0 14 4.6v2.8A1.6 1.6 0 0 0 15.6 9h2.8A1.6 1.6 0 0 0 20 7.4V4.6A1.6 1.6 0 0 0 18.4 3Zm0 10h-2.8a1.6 1.6 0 0 0-1.6 1.6v4.8a1.6 1.6 0 0 0 1.6 1.6h2.8a1.6 1.6 0 0 0 1.6-1.6v-4.8a1.6 1.6 0 0 0-1.6-1.6Z"
                />
              </g>
            </svg>
          </template>
        </SidebarItem>
      </SidebarNav>
      <SidebarNav heading="Management">
        <SidebarItem url="/users" title="User">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path
                  d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"
                />
                <circle cx="9" cy="7" r="4" />
              </g>
            </svg>
          </template>
        </SidebarItem>

        <SidebarItem url="/products" title="Product">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <path
                  d="M21 7.353v9.294a.6.6 0 0 1-.309.525l-8.4 4.666a.6.6 0 0 1-.582 0l-8.4-4.666A.6.6 0 0 1 3 16.647V7.353a.6.6 0 0 1 .309-.524l8.4-4.667a.6.6 0 0 1 .582 0l8.4 4.667a.6.6 0 0 1 .309.524"
                />
                <path d="m3.528 7.294l8.18 4.544a.6.6 0 0 0 .583 0l8.209-4.56M12 21v-9" />
              </g>
            </svg>
          </template>
        </SidebarItem>
      </SidebarNav>

      <!-- footer -->
      <div class="mt-auto flex flex-col gap-2 text-sm">
        <div class="flex flex-col">
          <SidebarItem
            title="Source Code"
            external
            href="https://github.com/ifanfairuz/onlineassetdev-test"
            rel="noopener nofollow"
            target="_blank"
            class="rounded-md"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <path
                    d="M16 22.027v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75a5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.4 13.4 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 0 0 5 5.797a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v2.87"
                  />
                  <path d="M9 20.027c-3 .973-5.5 0-7-3" />
                </g>
              </svg>
            </template>
          </SidebarItem>
          <SidebarItem
            title="Task Specification"
            external
            href="https://github.com/onlineassetdev/devtest"
            rel="noopener nofollow"
            target="_blank"
            class="rounded-md"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <path
                    d="M19 12V8c0-2.828 0-4.243-.879-5.121c-.878-.88-2.293-.88-5.121-.88H9c-2.828 0-4.243 0-5.121.88C3 3.757 3 5.172 3 7.999v8c0 2.83 0 4.244.879 5.122C4.757 22 6.172 22 9 22h2"
                  />
                  <path
                    d="M14.5 2h-7c0 1.414 0 2.121.44 2.56C8.378 5 9.085 5 10.5 5h1c1.414 0 2.121 0 2.56-.44c.44-.439.44-1.146.44-2.56M7 15h4m-4-4h8m.737 10.653L14 22l.347-1.737c.07-.353.244-.676.499-.93l4.065-4.066a.91.91 0 0 1 1.288 0l.534.534a.91.91 0 0 1 0 1.288l-4.065 4.065a1.8 1.8 0 0 1-.931.499"
                  />
                </g>
              </svg>
            </template>
          </SidebarItem>
        </div>
        <hr />
        <p class="text-sm text-muted-foreground">
          Junior Developer Coding Test<br />
          2025@OnlineAssetDev
        </p>
      </div>
    </div>
  </aside>
</template>
