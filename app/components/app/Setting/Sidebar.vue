<script setup lang="ts">
const { activeSidebar, activeSection } = useSidebarSettings();
const { data, signOut } = useAuth();

const route = useRoute();

const activeSidebarType = computed(() => {
  const simplePaths = ['/settings/users', '/settings/permissions', '/settings/account'];
  const path = route.path;

  if (simplePaths.includes(path)) {
    return 'simple';
  } else if (path.startsWith('/settings/permissions/group/')) {
    return 'detailed';
  }
  return 'simple';
});

watchEffect(() => {
  activeSidebar.value = activeSidebarType.value;
  activeSection.value = route.params?.role?.toString() || '';
});

</script>
<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1">
      <div v-if="activeSidebar === 'simple'" class="w-64 h-full bg-gray-50 p-4 border-r">
        <div class="space-y-1 mb-6">
          <h3 class="text-md text-gray-500 font-normal mb-2">Cá nhân</h3>
          <SettingSidebarItem to="/settings/account">Tài khoản</SettingSidebarItem>
        </div>

        <div class="space-y-1 mb-6">
          <h3 class="text-md text-gray-500 font-normal mb-2">Quản lý người dùng</h3>
          <SettingSidebarItem to="/settings/users">Người dùng</SettingSidebarItem>
          <SettingSidebarItem to="/settings/permissions">Quyền hạn</SettingSidebarItem>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-4 border-t bg-gray-50 border-r">
      <DropdownMenu>
        <DropdownMenuTrigger class="w-full">
          <div class="flex items-center space-x-3 text-left">
            <div class="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
              <img :src="data?.user?.image" :alt="data?.user?.name" class="h-full w-full object-cover">
            </div>
            <div class="flex flex-col max-w-[160px]">
              <span class="font-medium text-sm truncate">{{ data?.user?.name }}</span>
              <span class="text-xs text-gray-500 truncate">{{ data?.user?.email }}</span>
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent class="w-56">
          <div class="flex items-center p-2 border-b">
            <span class="text-normal text-gray-500">{{data?.user?.roles.map(role => role.name).join(', ')}}</span>
          </div>
          <DropdownMenuItem class="text-red-600 cursor-pointer hover:bg-red-400!"
            @click="signOut({ callbackUrl: '/' })">
            <span class="text-normal">Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
