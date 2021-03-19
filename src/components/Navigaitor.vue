<template>
      <header class="header">
      <h1 class="brand">Webpack & Vue.js</h1>
      <nav class="nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Customers</a>
        <a href="#">Project</a>
        <a href="#">Contact</a>
      </nav>
    </header>
</template>

<script>
  export default {
    name : 'Navigaitor'
  }
</script>

<style lang="scss">
.header{
  background-color: $bg-global;
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}
.brand{
  font-size: 2.5rem;
  color: white;
}
.nav{
  flex-basis: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2.5rem;
}
.nav a{
  text-decoration: none;
  color: white;
}
</style>