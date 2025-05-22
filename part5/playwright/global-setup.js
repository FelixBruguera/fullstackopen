async function globalSetup(config) {
  const { baseURL } = config.projects[0].use
  const envCheckUrl = `${baseURL}/api/env`

  try {
    const response = await fetch(envCheckUrl)
    if (!response.ok) {
        console.error(`Error fetching /env endpoint: ${response.status} ${response.statusText}`)
        process.exit(1)
    }
    const environmentData = await response.json()
    if (environmentData.env !== 'test') {
      console.error(`Environment is not 'test' (current: ${environmentData.env}).`)
      process.exit(1)
    }
  } catch (error) {
    console.error('Error during global setup checking environment:', error)
    process.exit(1)
  }
}

export default globalSetup