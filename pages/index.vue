<template>
  <div class="min-h-screen flex justify-center bg-blue-50 p-20">
    <div class="w-full mt-10 sm:mt-0 flex flex-col gap-y-4">
      <div class="text-center mb-6">
        <p class="font-bold text-3xl text-gray-800">Diagnosis App</p>
      </div>
      <div class="flex justify-center gap-6">
        <div class="mt-5 w-1/2">
          <form method="POST" @submit.prevent="submitForm">
            <div class="overflow-hidden shadow-xl">
              <div class="bg-white p-8 flex flex-col gap-y-6">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-blue-600">Dyslipidemia</h3>
                  <p class="mt-1 text-sm text-gray-600">Anyone at risk for dyslipidemia according to risk stratification profile or with confirmed dyslipidemia (elevated LDL/TC)</p>
                </div>
                <div class="flex flex-col gap-8">
                  <div class="grid grid-cols-3 gap-x-6">
                    <label>LDL/TC</label>
                    <div class="space-y-4">
                      <div class="flex items-center">
                        <input v-model="form.ldl" value="1" id="push-everything" name="push-notifications" type="radio">
                        <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700">Optimal/Desired</label>
                      </div>
                      <div class="flex items-center">
                        <input v-model="form.ldl" value="2" id="push-email" name="push-notifications" type="radio">
                        <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700">Borderline High</label>
                      </div>
                      <div class="flex items-center">
                        <input v-model="form.ldl" value="3" id="push-nothing" name="push-notifications" type="radio">
                        <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700">High</label>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-x-6">
                    <label for="comorbidities">No. of Comorbidities</label>
                    <input id="comorbidities" v-model="form.comorbidities" type="number" name="comorbidities" autocomplete="off">
                  </div>
                  <div class="grid grid-cols-3 gap-x-6">
                    <label for="age">Patient Age</label>
                    <input id="age" type="number" v-model="form.age" name="age" autocomplete="off">
                  </div>
                  <fieldset class="grid grid-cols-3 gap-x-6">
                    <label for="age">Risk Factors</label>
                    <div class="col-span-2 space-y-4">
                      <div v-for="(risk, index) in risks" :key="risk" class="flex items-start">
                        <div class="flex h-5 items-center">
                          <input
                            :id="`risk-` + index"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            :value="risk"
                            @click="() => {selectRisks(index)}"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label :for="`risk-` + index" class="font-medium text-gray-700">{{ risk }}</label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <div class="grid grid-cols-3 gap-x-6">
                    <label for="gender">Gender</label>
                    <select v-model="form.gender" name="gender" id="gender">
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                  </div>
                  <div class="grid grid-cols-3 gap-x-6">
                    <label for="medications">No. of Medications</label>
                    <input v-model="form.medications" id="medications" type="number" name="medications" autocomplete="off">
                  </div>
                  <div class="grid grid-cols-3 gap-x-6">
                    <label for="bmi">BMI (kg/m2)</label>
                    <select v-model="form.bmi" name="bmi" id="bmi">
                      <option value="1">Normal (18.5-24.9)</option>
                      <option value="2">Overweight (25-29.9)</option>
                      <option value="3">Obese (>30)</option>
                    </select>
                  </div>
                  <div class="grid grid-cols-3 gap-x-6">
                    <label for="smoking">Smoking (With or W/O pack years)</label>
                    <select v-model="form.smoking" name="bmi" id="smoking" class="col-span-2">
                      <option value="1">Non-smoker/ stopped smoking >10 years ago</option>
                      <option value="2">Stopped smoking less than 10 years ago / Current smoker  with <10 pack years</option>
                      <option value="3">Smoker with > 10 pack years</option>
                    </select>
                  </div>
                  <div class="grid grid-cols-3 gap-x-6">
                    <label>Family History</label>
                    <div class="space-y-4">
                      <div class="flex items-center">
                        <input v-model="form.history" value="1" id="history_no" type="radio">
                        <label for="history_no" class="ml-3 block text-sm font-medium text-gray-700">No</label>
                      </div>
                      <div class="flex items-center">
                        <input v-model="form.history" value="2" id="history_yes" type="radio">
                        <label for="history_no" class="ml-3 block text-sm font-medium text-gray-700">Yes</label>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-x-6">
                    <label>ASCVD risk (calculator link attached below)</label>
                    <div class="space-y-4">
                      <div class="flex items-center">
                        <input v-model="form.ascvd" value="1" id="ascvd_1" type="radio">
                        <label for="ascvd_1" class="ml-3 block text-sm font-medium text-gray-700">Low-Borderline risk</label>
                      </div>
                      <div class="flex items-center">
                        <input v-model="form.ascvd" value="2" id="ascvd_2" type="radio">
                        <label for="ascvd_2" class="ml-3 block text-sm font-medium text-gray-700">Intermediate risk</label>
                      </div>
                      <div class="flex items-center">
                        <input v-model="form.ascvd" value="3" id="ascvd_3" type="radio">
                        <label for="ascvd_3" class="ml-3 block text-sm font-medium text-gray-700">High risk
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button class="btn">Submit</button>
              </div>
              <div v-if="result !== null" class="bg-blue-200 text-center text-blue-900 py-4 w-full font-medium">
                {{ result }}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data(){
    return {
      risks: ['Smoking cigarette', 'Excessive alcohol consumption (using guideline recommendations)', 'Sedentary lifestyle', 'Stress'],
      result: null,
      form: {
        ldl: null,
        comorbidities: null,
        age: null,
        risks: [],
        gender: null,
        medications: null,
        bmi: null,
        smoking: null,
        history: null,
        ascvd: null
      }
    }
  },
  methods: {
    selectRisks(index){
      if(this.form.risks.includes(index)){
        const el = this.form.risks.indexOf(index)
        this.form.risks.splice(el, 1)
      } else {
        this.form.risks.push(index)
      }
    },

    submitForm(){
      const { ldl, comorbidities, age, risks, gender, medications, bmi, smoking, history, ascvd} = this.form
      let agePoints
      if(age >= 55 && age <= 75 ){
        agePoints = 3
      } else if(age >= 35 && age < 55){
        agePoints = 2
      } else if (age < 35){
        agePoints = 1
      }

      this.$axios.post('/api/diagnosis', {
        ldl: parseInt(ldl),
        comorbidities: parseInt(comorbidities) + 1,
        age: agePoints,
        risks: risks.length > 2 ? 3 : risks.length + 1,
        gender: parseInt(gender),
        medications: medications > 2 ? 3 : parseInt(medications) + 1,
        bmi: parseInt(bmi),
        smoking: parseInt(smoking),
        history: parseInt(history),
        ascvd: parseInt(ascvd)
      }).then((res) => {
        console.log(res.data);
        this.result = res.data.result
      })
    }
  }
}
</script>


<style>
input[type="text"], input[type="number"], select{
  @apply appearance-none py-3 px-4 outline-none focus:outline-none border rounded-lg shadow
}

input[type="radio"] {
  @apply h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500
}

label{
  @apply block text-sm font-medium text-gray-700
}

.btn{
  @apply inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
}
</style>
