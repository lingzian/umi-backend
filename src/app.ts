export async function getInitialState() {
  console.log('执行没有')
  const data = await new Promise((resolve, reject) => {
    resolve({})
  })
  return data
}