<script setup>
import { defineProps, defineEmits, ref } from "vue";
import {onClickOutside} from '@vueuse/core'

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const target = ref(null)
onClickOutside(target, ()=>emit('modal-close'))

</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <slot name="header"> default header </slot>
        </div>
        <div class="modal-body">
          <slot name="content"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div>
              <button @click.stop="emit('modal-close')">Close</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-container {
    width: 300px;
    margin: 150px auto;
    padding: 20px 30px;
    background-color: #646464;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  }
  button {
      
      display: inline-block;
      padding: 10px 25px;
      font-size: 16px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: #fff;
      background-color: #dd720e;
      border: none;
      border-radius: 15px;
      box-shadow: 0 9px #363636;
  }
  button:hover {background-color: #dd8430}
  button:active {
    background-color: #dd8430;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
</style>