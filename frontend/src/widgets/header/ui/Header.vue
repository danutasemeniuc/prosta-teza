<script>
export default {
  name: 'Header',
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <div class="header__logo">
          <router-link to="/">
            Prosta Teza
          </router-link>
        </div>
        <nav class="header__nav">
          <router-link
            to="/"
            class="header__link"
          >
            Home
          </router-link>
          <!-- Future navigation links -->
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
}

.header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.header__nav {
  display: flex;
  gap: 1.5rem;
}

.header__link {
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: color 0.2s;
}

.header__link:hover,
.header__link.router-link-active {
  color: var(--color-primary);
}
</style>
