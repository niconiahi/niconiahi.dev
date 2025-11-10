<script lang="ts">
  import Header from "$lib/components/header.svelte";
  import favicon from "$lib/assets/favicon.svg";
  import "$lib/styles/fonts.css";
  import "$lib/styles/global.css";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header />

{@render children()}
