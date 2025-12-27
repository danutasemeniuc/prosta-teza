<script>
import { ref } from 'vue'
import { healthApi } from '@/shared/api/endpoints'
import { Button } from '@/shared/ui'

export default {
  name: 'HomePage',
  components: {
    Button,
  },
  setup() {
    const healthStatus = ref(null)
    const error = ref(null)

    const checkHealth = async () => {
      try {
        error.value = null
        const response = await healthApi.check()
        healthStatus.value = response
      }
      catch (err) {
        error.value = 'Failed to connect to API. Make sure the backend is running.'
        console.error(err)
      }
    }

    return {
      healthStatus,
      error,
      checkHealth,
    }
  },
}
</script>

<template>
  <div class="home-page">
    <div class="container">
      <div class="hero">
        <h1 class="hero__title">
          Welcome to Prosta Teza
        </h1>
        <p class="hero__description">
          A modern fullstack application built with Vue.js and Express
        </p>

        <div class="hero__actions">
          <Button
            variant="primary"
            @click="checkHealth"
          >
            Check API Health
          </Button>
        </div>

        <div
          v-if="healthStatus"
          class="health-status"
        >
          <h2>API Status</h2>
          <pre>{{ JSON.stringify(healthStatus, null, 2) }}</pre>
        </div>

        <div
          v-if="error"
          class="error-message"
        >
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding: 4rem 0;
}

.hero {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero__title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.hero__description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.hero__actions {
  margin-bottom: 2rem;
}

.health-status {
  margin-top: 2rem;
  text-align: left;
  background-color: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: var(--border-radius);
}

.health-status h2 {
  margin-bottom: 1rem;
}

.health-status pre {
  background-color: #1f2937;
  color: #10b981;
  padding: 1rem;
  border-radius: var(--border-radius);
  overflow-x: auto;
}

.error-message {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fee2e2;
  color: var(--color-error);
  border-radius: var(--border-radius);
}
</style>
