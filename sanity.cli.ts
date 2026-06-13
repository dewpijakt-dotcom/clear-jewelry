import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '2dkw5oqu',
    dataset: 'production',
  },
  studioHost: 'clear-jewelry',
  /* If you re-deploy and 'clear-jewelry' is taken, change the host above. */
});
