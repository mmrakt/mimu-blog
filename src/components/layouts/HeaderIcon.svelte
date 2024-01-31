<script lang="ts">
  import { theme } from "$/store/theme"

</script>
<div>
    {#if $theme === 'light'}
        <img width="150" height="40" src="/images/icon-light-theme.svg" alt="">
    {:else} 
        <img width="150" height="40" src="/images/icon-dark-theme.svg" alt="">
    {/if}
</div>
