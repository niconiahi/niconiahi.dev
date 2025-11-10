<script>
  let { children } = $props();
</script>

<div class="container">
  <div>
    <span>A1</span>
    <div class="separator"></div>
    <h1>{@render children()}</h1>
  </div>
  <div class="lines">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  span {
    color: var(--red);
  }
  h1 {
    font-size: 1.125rem;
    font-weight: normal;
    color: var(--neutral-700);
    text-transform: uppercase;
  }
  .separator {
    width: 3px;
    height: 1rem;
    background: var(--neutral-1000);
  }
  .lines {
    display: flex;
    flex-direction: column;
    gap: 1px;
    width: 100%;
  }
  .line {
    height: 1px;
    width: 100%;
    background: var(--neutral-1000);
  }
  .line:last-child {
    height: 4px;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.75rem 0;
    padding-inline-start: 2.5rem;
  }
</style>
