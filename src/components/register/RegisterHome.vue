<template>
  <div>
    <el-steps :active="active" finish-status="success" simple="true">
      <el-step title="步骤 1"> </el-step>
      <el-step title="步骤 2"> </el-step>
      <el-step title="步骤 3"> </el-step>
    </el-steps>
    <el-row>
      <el-col :span="12" :offset="6" v-if="active == 1">
        <FirstStep />
      </el-col>
      <el-col :span="12" :offset="6" v-if="active == 2">
        <SecendStep />
      </el-col>
      <el-col :span="12" :offset="6" v-if="active == 3">
        <ThirdStep />
      </el-col>
    </el-row>

    <el-button style="margin-top: 12px" @click="last">上一步</el-button>
    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
    <!-- <b-steps type="is-info">
      <b-step-item label="第一步" icon="account-key">
        <FirstStep />
      </b-step-item>
      <b-step-item label="第二步" icon="account">
        <SecendStep />
      </b-step-item>
      <b-step-item label="第三步" icon="account-plus">
        <ThirdStep />
      </b-step-item>
    </b-steps> -->
  </div>
</template>


<script>
import FirstStep from "../register/FirstStep";
import SecendStep from "../register/SecendStep";
import ThirdStep from "../register/ThirdStep";
export default {
  components: {
    FirstStep,
    SecendStep,
    ThirdStep,
  },
  data() {
    return {
      active: 1,
    };
  },
  methods: {
    last() {
      if (this.active-- < 2) {
        this.active = 1;
        this.$message({
          message: "这是第一步了~",
          type: "warning",
        });
      }
    },
    next() {
      if (this.active++ > 2) {
        this.active = 3;
        this.$message({
          message: "这是最后一步了~",
          type: "warning",
        });
      }
    },
  },
};
</script>


<style scoped>
</style>