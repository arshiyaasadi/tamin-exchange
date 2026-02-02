/**
 * Mock API برای احراز هویت - تا زمان اتصال به بک‌اند واقعی
 */
const MOCK_OTP = '123456'
const MOCK_PASSWORD = 'Test1234'
const MOCK_EXISTING_MOBILE = '09121111111'

export async function checkUserByMobile(mobile) {
  await delay(800)
  const normalized = String(mobile ?? '').replace(/\D/g, '')
  return { exists: normalized === MOCK_EXISTING_MOBILE.replace(/\D/g, '') }
}

export async function verifyPassword(mobile, password) {
  await delay(800)
  return { success: password === MOCK_PASSWORD }
}

export async function sendOtp(mobile, purpose) {
  await delay(600)
  return { sent: true }
}

export async function verifyOtp(mobile, otp, purpose) {
  await delay(800)
  const normalized = String(otp ?? '').replace(/\D/g, '')
  return { success: normalized === MOCK_OTP }
}

export async function register(mobile, otp, password, inviteCode) {
  await delay(800)
  return { token: `token_${mobile}_${Date.now()}` }
}

export async function loginAfterOtp(mobile, otp) {
  await delay(800)
  return { token: `token_${mobile}_${Date.now()}` }
}

export async function resetPassword(mobile, otp, newPassword) {
  await delay(800)
  return { success: true, token: `token_${mobile}_${Date.now()}` }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
