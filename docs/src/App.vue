<template>
  <div class="fixed flex right-0 top-0 pr-8 pt-6">
    <a href="https://twitter.com/8bitgomes" target="_blank" style="color: #00aced">
      <div class="block flex items-center w-8 h-8 mr-4 rounded-full bg-zinc-100 flex items-center justify-center">
        <svg class="fill-current w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Twitter</title>
          <path
            d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"
          ></path>
        </svg>
      </div>
    </a>
    <a href="https://github.com/ruigomeseu/bitcoin-units" target="_blank">
      <div class="block flex items-center w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
        <svg class="fill-current w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>GitHub</title>
          <path
            d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
          ></path>
        </svg>
      </div>
    </a>
  </div>
  <div class="flex flex-col items-center justify-center px-4 pt-16">
    <div class="w-full max-w-sm">
      <div class="">
        <h1 class="text-2xl font-medium uppercase tracking-wide text-zinc-400">Convert bitcoin units</h1>
      </div>
      <div id="app" class="mt-12">
        <div class="">
          <label class="block uppercase tracking-wide text-zinc-500 text-xs font-medium mb-2"> From </label>
          <div class="relative">
            <input
              class="appearance-none block w-full bg-zinc-950 text-white rounded py-4 px-4 font-bold text-lg leading-tight focus:outline-none"
              v-bind:value="from"
              v-on:input="update('from', ($event.target as HTMLInputElement).value)"
              placeholder="0"
              min="0"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
              <multiselect v-model="fromUnit" :options="currencies" :allow-empty="false" />
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <button @click="swap" class="w-6 mt-5 mb-1">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071L15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10.2929 11.7071C9.9024 11.3166 9.9024 10.6834 10.2929 10.2929C10.6834 9.9024 11.3166 9.9024 11.7071 10.2929L14 12.5858L14 1C14 0.44772 14.4477 -2.42698e-07 15 -2.18557e-07C15.5523 -1.94416e-07 16 0.44772 16 1L16 12.5858L18.2929 10.2929C18.6834 9.9024 19.3166 9.9024 19.7071 10.2929ZM9.7071 5.70711C9.3166 6.0976 8.6834 6.0976 8.2929 5.70711L6 3.41421L6 15C6 15.5523 5.5523 16 5 16C4.4477 16 4 15.5523 4 15L4 3.41421L1.7071 5.70711C1.3166 6.0976 0.6834 6.0976 0.2929 5.70711C-0.0976002 5.31658 -0.0976001 4.68342 0.2929 4.29289L4.2929 0.292889C4.4804 0.105359 4.7348 -6.67263e-07 5 -6.55671e-07C5.2652 -6.44079e-07 5.5196 0.105359 5.7071 0.292889L9.7071 4.29289C10.0976 4.68342 10.0976 5.31658 9.7071 5.70711Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div class="mb-6">
          <label class="block uppercase tracking-wide text-zinc-500 text-xs font-medium mb-2">To</label>
          <div class="relative">
            <input
              class="appearance-none block w-full bg-zinc-950 text-white rounded py-4 px-4 font-bold text-lg leading-tight focus:outline-none"
              v-bind:value="to"
              v-on:input="update('to', ($event.target as HTMLInputElement).value)"
              placeholder="0"
              min="0"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
              <multiselect v-model="toUnit" :options="currencies" :allow-empty="false" />
            </div>
          </div>
        </div>
        <div class="mb-4">
          <p class="block uppercase tracking-wide text-zinc-500 text-xs font-medium mb-2">Formatted value</p>
          <div class="text-white font-bold text-lg leading-tight">{{ toBitcoinUnit.format() }}</div>
        </div>
        <div class="mb-4">
          <p class="block uppercase tracking-wide text-zinc-500 text-xs font-medium mb-2">Raw value</p>
          <div class="text-white font-bold text-lg leading-tight">
            {{ toBitcoinUnit.getValue() }}
          </div>
        </div>
        <div class="mb-4">
          <p class="block uppercase tracking-wide text-zinc-500 text-xs font-medium mb-2">Code</p>
          <div>
            <pre><code class="font-fira" style="user-select: all;"><span style="color: #BC7BDD">new</span> <span style="color: #72ABEE">BitcoinUnit</span><span style="color: #6CB2C0">(</span><span style="color: #C89B66">{{ from ? from : 0 }}</span><span style="color: #AAB1BE">,</span> <span style="color: #9EC077">'{{ fromUnit }}'</span><span style="color: #6CB2C0">)</span><span style="color: #AAB1BE">.</span><span style="color: #72ABEE">to</span><span style="color: #6CB2C0">(</span><span style="color: #9EC077">'{{ toUnit }}'</span><span style="color: #6CB2C0">)</span><span style="color: #AAB1BE">;</span></code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Multiselect from 'vue-multiselect';
import { BitcoinUnit } from 'bitcoin-units';

export default {
  components: { Multiselect },

  data() {
    return {
      from: '100000000',
      to: '1',
      fromUnit: 'sats',
      toUnit: 'BTC',
      updated: null,
    };
  },

  methods: {
    swap() {
      const oldFromUnit = this.fromUnit.slice();
      const oldFrom = String(this.from).slice();
      this.fromUnit = this.toUnit;
      this.toUnit = oldFromUnit;
      this.from = this.to;
      this.to = oldFrom;
    },

    update(direction: 'to' | 'from', amount: string) {
      if (direction === 'to') {
        this.to = amount;
        this.from = new BitcoinUnit(Number(this.to), this.toUnit).to(this.fromUnit).toString();
      }

      if (direction === 'from') {
        this.from = amount;
        this.to = new BitcoinUnit(Number(this.from), this.fromUnit).to(this.toUnit).toString();
      }
    },
  },

  computed: {
    toBitcoinUnit() {
      return new BitcoinUnit(Number(this.to), this.toUnit);
    },

    currencies() {
      return ['BTC', 'sats', 'bit', 'mbtc', 'USD', 'EUR', 'GBP', 'CAD'];
    },
  },

  watch: {
    fromUnit() {
      this.update('from', String(this.from));
    },

    toUnit() {
      this.update('from', this.from);
    },
  },

  mounted() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp,cad')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const rates = data.bitcoin;

        for (const currency of Object.keys(rates)) {
          const rate = rates[currency];

          BitcoinUnit.setFiat(currency, rate, {
            format: `{amount} ${currency.toUpperCase()}`,
            fractionDigits: 2,
            trailingZeros: true,
          });
        }
      });
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.multiselect {
  color: #ffffff;
}

.multiselect__tags {
  background: #242424;
  border: none;
}

.multiselect__input,
.multiselect__single {
  background: #242424;
  border: none;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
}

.multiselect__content-wrapper {
  background: #242424;
  border: none;
}

.multiselect__input::placeholder {
  color: #71717a;
}

.multiselect__select::before {
  border-color: #ffffff transparent transparent;
}
</style>
