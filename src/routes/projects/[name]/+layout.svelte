<main>
  <slot />
</main>

<style>
  main {
    padding-inline: 1.5rem;
    padding-block: 4rem;
    margin: 0 auto;
    width: 100%;

    @media (min-width: 60rem) {
      width: 60vw;
    }
  }
  main :global(> *) {
    margin-bottom: 1rem;
  }
  main :global(pre) {
    overflow-x: auto;
    max-width: 100%;
    background-color: #272822;
    padding: 1rem;
    border-radius: 0.25rem;
  }

  main :global(code) {
    font-family: "Menlo", "Monaco", "Courier New", monospace;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #f8f8f2;
  }

  main :global(p code),
  main :global(li code) {
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    color: var(--neutral-900);
    background-color: var(--neutral-500);
  }

  main :global(ul) {
    margin-left: 1rem;
  }

  main :global(.token.keyword) {
    color: #f92672;
    font-weight: 500;
  }

  main :global(.token.operator) {
    color: #f92672;
  }

  main :global(.token.function) {
    color: #a6e22e;
  }

  main :global(.token.punctuation) {
    color: #f8f8f2;
  }

  main :global(.token.string) {
    color: #e6db74;
  }

  main :global(.token.number) {
    color: #ae81ff;
  }

  main :global(.token.comment) {
    color: #75715e;
    font-style: italic;
  }

  main :global(.token.property) {
    color: #66d9ef;
  }

  main :global(.token.boolean) {
    color: #ae81ff;
  }
</style>
