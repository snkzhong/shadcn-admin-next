'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// 🔹 1. 明确定义 Schema 并导出类型
const createUserSchema = z.object({
  username: z.string().min(2, { message: '用户名至少 2 个字符' }),
  email: z.string().email({ message: '邮箱格式不正确' }),
})

// 🔹 2. 自动从 Schema 推导输入类型和字段键
export type CreateUserInput = z.infer<typeof createUserSchema>
type FieldName = keyof CreateUserInput

// 🔹 3. 统一的状态返回类型（更清晰）
export interface ActionResult {
  success: boolean
  message?: string
  errors?: Partial<Record<FieldName, string>>
}

// 🔹 4. 主函数：createUser
export async function createUser(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // 🔹 5. 安全地提取表单数据并转换类型
  const raw: Partial<CreateUserInput> = {}
  for (const [key, value] of formData.entries()) {
    if (key === 'username' || key === 'email') {
      raw[key] = typeof value === 'string' ? value.trim() : ''
    }
  }

  // 🔹 6. 使用 Zod 验证
  const result = createUserSchema.safeParse(raw)

  if (!result.success) {
    // 🔹 7. 将 Zod 的 fieldErrors 转换为 { field: string } 格式（取第一条错误）
    const errors: Partial<Record<FieldName, string>> = {}
    const fieldErrors = result.error.flatten().fieldErrors

    ;(['username', 'email'] as const).forEach((key) => {
      const messages = fieldErrors[key]
      if (messages && messages.length > 0) {
        errors[key] = messages[0] // 只显示第一条错误
      }
    })

    return { success: false, errors }
  }

  const data = result.data

  // 🔹 8. TODO: 实际业务逻辑（数据库插入、邮件发送等）
  console.log('[Server Action] 创建用户:', data)
  // await db.user.create({ data })
  // await sendWelcomeEmail(data.email)

  // 🔹 9. 操作成功后刷新相关页面
  revalidatePath('/users') // 如果有用户列表页

  return {
    success: true,
    message: '🎉 用户创建成功！',
  }
}