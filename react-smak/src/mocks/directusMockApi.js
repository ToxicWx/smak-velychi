const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

export async function requestLoginCode(payload) {
  await sleep()

  console.log('MOCK requestLoginCode', payload)

  return {
    success: true,
    phone: payload.phone,
    codeSent: true,
  }
}

export async function verifyLoginCode(payload) {
  await sleep()

  console.log('MOCK verifyLoginCode', payload)

  return {
    success: true,
    token: 'mock-token',
    user: {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      phone: payload.phone,
      email: 'johndoe@gmail.com',
    },
  }
}

export async function createTastingRequest(payload) {
  await sleep()

  console.log('MOCK createTastingRequest', payload)

  return {
    success: true,
    id: Date.now(),
    ...payload,
  }
}

export async function registerForTasting(payload) {
  await sleep()

  console.log('MOCK registerForTasting', payload)

  return {
    success: true,
    id: Date.now(),
    ...payload,
  }
}

export async function updateProfile(payload) {
  await sleep()

  console.log('MOCK updateProfile', payload)

  return {
    success: true,
    user: payload,
  }
}