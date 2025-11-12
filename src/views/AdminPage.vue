<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <div class="text-2xl font-bold">{{ records.length }}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
            <CheckCircle class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ totalClicks.toLocaleString() }}</div>
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
                Quản lý Users
              </TabsTrigger>
              <TabsTrigger value="records" class="gap-2">
                <Link2 class="h-4 w-4" />
                Quản lý URL Records
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
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          EMAIL
                        </th>
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          STATUS
                        </th>
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          URLS
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
                        v-for="user in filteredUsers"
                        :key="user.id"
                        class="border-b transition-colors hover:bg-muted/50"
                      >
                        <td class="p-4 align-middle font-medium">{{ user.id }}</td>
                        <td class="p-4 align-middle">{{ user.username }}</td>
                        <td class="p-4 align-middle">{{ user.email }}</td>
                        <td class="p-4 align-middle">
                          <Badge
                            :variant="user.status === 'active' ? 'default' : 'secondary'"
                            class="cursor-pointer"
                            @click="toggleUserStatus(user.id)"
                          >
                            {{ user.status }}
                          </Badge>
                        </td>
                        <td class="p-4 align-middle">{{ user.totalUrls }}</td>
                        <td class="p-4 align-middle">{{ user.createdAt }}</td>
                        <td class="p-4 align-middle text-right">
                          <div class="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit class="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              @click="openDeleteDialog('user', user.id)"
                            >
                              <Trash2 class="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="filteredUsers.length === 0">
                        <td colspan="7" class="p-4 text-center text-muted-foreground">
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
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          ID
                        </th>
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          USER
                        </th>
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          ORIGINAL URL
                        </th>
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          SHORT CODE
                        </th>
                        <th
                          class="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs"
                        >
                          CLICKS
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
                        v-for="record in filteredRecords"
                        :key="record.id"
                        class="border-b transition-colors hover:bg-muted/50"
                      >
                        <td class="p-4 align-middle font-medium">{{ record.id }}</td>
                        <td class="p-4 align-middle">{{ record.username }}</td>
                        <td class="p-4 align-middle max-w-md truncate" :title="record.originalUrl">
                          {{ record.originalUrl }}
                        </td>
                        <td class="p-4 align-middle">
                          <code class="relative rounded bg-muted px-2 py-1 font-mono text-sm">
                            {{ record.shortCode }}
                          </code>
                        </td>
                        <td class="p-4 align-middle font-semibold">{{ record.clicks }}</td>
                        <td class="p-4 align-middle">{{ record.createdAt }}</td>
                        <td class="p-4 align-middle text-right">
                          <div class="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit class="h-4 w-4" />
                            </Button>
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
                      <tr v-if="filteredRecords.length === 0">
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
          <AlertDialogAction @click="confirmDelete">Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup>
  import { CheckCircle, Edit, Link2, Search, Trash2, Users } from 'lucide-vue-next'
  import { computed, ref } from 'vue'

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

  import { Badge } from '@/components/ui/badge'
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

  const users = ref([
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      status: 'active',
      createdAt: '2025-01-15',
      totalUrls: 12
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane@example.com',
      status: 'active',
      createdAt: '2025-02-20',
      totalUrls: 8
    },
    {
      id: 3,
      username: 'mike_wilson',
      email: 'mike@example.com',
      status: 'inactive',
      createdAt: '2025-03-10',
      totalUrls: 5
    },
    {
      id: 4,
      username: 'sarah_jones',
      email: 'sarah@example.com',
      status: 'active',
      createdAt: '2025-04-05',
      totalUrls: 15
    },
    {
      id: 5,
      username: 'david_brown',
      email: 'david@example.com',
      status: 'active',
      createdAt: '2025-05-12',
      totalUrls: 20
    }
  ])

  const records = ref([
    {
      id: 1,
      userId: 1,
      username: 'john_doe',
      originalUrl: 'https://example.com/very/long/url/path',
      shortCode: 'abc123',
      clicks: 156,
      createdAt: '2025-10-15'
    },
    {
      id: 2,
      userId: 1,
      username: 'john_doe',
      originalUrl: 'https://docs.google.com/document/example',
      shortCode: 'xyz789',
      clicks: 89,
      createdAt: '2025-10-20'
    },
    {
      id: 3,
      userId: 2,
      username: 'jane_smith',
      originalUrl: 'https://github.com/user/repo/issues',
      shortCode: 'def456',
      clicks: 234,
      createdAt: '2025-10-18'
    },
    {
      id: 4,
      userId: 4,
      username: 'sarah_jones',
      originalUrl: 'https://medium.com/article/title',
      shortCode: 'ghi789',
      clicks: 445,
      createdAt: '2025-10-22'
    },
    {
      id: 5,
      userId: 5,
      username: 'david_brown',
      originalUrl: 'https://youtube.com/watch?v=example',
      shortCode: 'jkl012',
      clicks: 1203,
      createdAt: '2025-10-25'
    },
    {
      id: 6,
      userId: 2,
      username: 'jane_smith',
      originalUrl: 'https://stackoverflow.com/questions/12345',
      shortCode: 'mno345',
      clicks: 67,
      createdAt: '2025-10-28'
    },
    {
      id: 7,
      userId: 1,
      username: 'john_doe',
      originalUrl: 'https://twitter.com/user/status/example',
      shortCode: 'pqr678',
      clicks: 312,
      createdAt: '2025-11-01'
    },
    {
      id: 8,
      userId: 4,
      username: 'sarah_jones',
      originalUrl: 'https://linkedin.com/in/profile',
      shortCode: 'stu901',
      clicks: 89,
      createdAt: '2025-11-03'
    }
  ])

  // Computed
  const totalClicks = computed(() => records.value.reduce((sum, r) => sum + r.clicks, 0))

  const filteredUsers = computed(() =>
    users.value.filter(
      user =>
        user.username.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  )

  const filteredRecords = computed(() =>
    records.value.filter(
      record =>
        record.username.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        record.originalUrl.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        record.shortCode.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  )

  // Methods
  const toggleUserStatus = id => {
    const user = users.value.find(u => u.id === id)
    if (user) {
      user.status = user.status === 'active' ? 'inactive' : 'active'
    }
  }

  const openDeleteDialog = (type, id) => {
    deleteDialog.value = {
      open: true,
      type,
      id
    }
  }

  const confirmDelete = () => {
    if (deleteDialog.value.type === 'user') {
      users.value = users.value.filter(u => u.id !== deleteDialog.value.id)
      records.value = records.value.filter(r => r.userId !== deleteDialog.value.id)
    } else {
      records.value = records.value.filter(r => r.id !== deleteDialog.value.id)
    }
    deleteDialog.value = { open: false, type: null, id: null }
  }
</script>
