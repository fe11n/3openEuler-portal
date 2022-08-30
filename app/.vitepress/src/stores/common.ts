import { defineStore } from 'pinia';

export const useCommon = defineStore('common', {
  state: () => ({
    theme: '',
    iconMenuShow: true,
  }),
});
