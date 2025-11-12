<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ users.length }}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">Total URLs</CardTitle>
            <Link2 class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ records ? records.length : 0 }}</div>
          </CardContent>
        </Card>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" class="w-full">
        <Card>
          <CardHeader>
            <TabsList class="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="users" class="gap-2">
                <Users class="h-4 w-4" />
                Manage Users
              </TabsTrigger>
              <TabsTrigger value="records" class="gap-2">
                <Link2 class="h-4 w-4" />
                Manage URL Records
              </TabsTrigger>
            </TabsList>

            <!-- Search -->
            <div class="relative mt-4">
              <Search
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input v-model="searchTerm" placeholder="Tìm kiếm..." class="pl-10" />
            </div>
          </CardHeader>

          <CardContent>
            <!-- Users Table -->
            <TabsContent value="users">
              <div class="rounded-md border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="border-b bg-muted/50">
                      <tr>
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          ID
                        </th>
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          USERNAME
                        </th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-xs">EMAIL</th>
                        <th
                          class="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-xs"
                        >
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="user in filteredUsers"
                        :key="user.id"
                        class="border-b transition-colors hover:bg-muted/50"
                      >
                        <td class="p-4 align-middle text-xs font-mono">{{ user.userId }}</td>
                        <td class="p-4 align-middle">{{ user.username }}</td>
                        <td class="p-4 align-middle">{{ user.email }}</td>
                        <td class="p-4 align-middle text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            @click="openDeleteDialog('user', user.userId)"
                            class="h-8 w-8"
                          >
                            <Trash2 class="h-4 w-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                      <tr v-if="filteredUsers.length === 0">
                        <td colspan="4" class="p-4 text-center text-muted-foreground">
                          Không tìm thấy user nào
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <!-- Records Table -->
            <TabsContent value="records">
              <div class="rounded-md border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="border-b bg-muted/50">
                      <tr>
                        <th
                          class="h-12 px-5 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          ID
                        </th>

                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          ORIGINAL URL
                        </th>
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          SHORT URL
                        </th>
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          CREATED
                        </th>
                        <th
                          class="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-xs"
                        >
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="record in records"
                        :key="record.id"
                        class="border-b transition-colors hover:bg-muted/50"
                      >
                        <td class="p-4 align-middle font-medium">{{ record.id }}</td>
                        <td class="p-4 align-middle max-w-md truncate" :title="record.originalUrl">
                          {{ record.originalUrl }}
                        </td>
                        <td class="p-4 align-middle">
                          <code class="relative rounded bg-muted px-2 py-1 font-mono text-sm">
                            {{ record.shortUrl }}
                          </code>
                        </td>
                        <td class="p-4 align-middle">{{ record.createdAt }}</td>
                        <td class="p-4 align-middle text-right">
                          <div class="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              @click="openDeleteDialog('record', record.id)"
                            >
                              <Trash2 class="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="records.length === 0">
                        <td colspan="7" class="p-4 text-center text-muted-foreground">
                          Không tìm thấy record nào
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </main>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="deleteDialog.open">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
          <AlertDialogDescription>
            {{
              deleteDialog.type === 'user'
                ? 'Bạn có chắc muốn xóa user này? Tất cả URLs của user sẽ bị xóa.'
                : 'Bạn có chắc muốn xóa record này?'
            }}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete(deleteDialog.id)">Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup>
  import { Link2, Search, Trash2, Users } from 'lucide-vue-next'
  import { computed, onMounted, ref } from 'vue'

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from '@/components/ui/alert-dialog'

  import { deleteUrl, deleteUser, getUrl, getUser } from '@/apis/user'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
  import AppHeader from '@/components/url-shortener/AppHeader.vue'
  // State
  const activeTab = ref('users')
  const searchTerm = ref('')
  const deleteDialog = ref({
    open: false,
    type: null,
    id: null
  })

  const users = ref([])

  const records = ref([])

  const loading = ref(false)
  const error = ref(null)

  const filteredUsers = computed(() =>
    users.value.filter(
      user =>
        user.username.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  )

  // const filteredRecords = computed(
  //   () => {
  //   }
  //   // records.value.filter(
  //   //   record =>
  //   //     record.username.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
  //   //     record.originalUrl.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
  //   //     record.shortCode.toLowerCase().includes(searchTerm.value.toLowerCase())
  //   // )
  // )

  // Methods
  const openDeleteDialog = (type, id) => {
    deleteDialog.value = {
      open: true,
      type,
      id
    }
  }

  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await getUser()
      users.value = res.data.users || res.data || []
    } catch (err) {
      error.value = 'Không thể tải dữ liệu'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const fetchRecords = async () => {
    loading.value = true
    try {
      const res = await getUrl()

      records.value = res.data.shortUrls
    } catch (err) {
      console.error(err)
      error.value = 'Không thể tải dữ liệu record'
    } finally {
      loading.value = false
    }
  }

  const confirmDelete = async id => {
    try {
      console.log(id)

      if (deleteDialog.value.type === 'user') {
        // const userId = deleteDialog.value.id
        await deleteUser(id)
        fetchUsers()
      } else if (deleteDialog.value.type === 'record') {
        await deleteUrl(id)
        fetchRecords()
      }
    } catch (err) {
      alert('Xóa thất bại!')
      console.error(err)
    } finally {
      deleteDialog.value = { open: false, type: null, id: null }
    }
    s
  }

  onMounted(() => {
    // GỌI TUẦN TỰ: users trước → records sau
    fetchUsers().then(() => {
      fetchRecords()
    })
  })
</script>
