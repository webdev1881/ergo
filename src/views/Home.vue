<template>
  <div class="home">
    <h4>Home</h4>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Item Name</th>
          <th>Item Price</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Alvin</td>
          <td>Eclair</td>
          <td>$0.87</td>
        </tr>
        <tr>
          <td>Alan</td>
          <td>Jellybean</td>
          <td>$3.76</td>
        </tr>
        <tr>
          <td>Jonathan</td>
          <td>Lollipop</td>
          <td>$7.00</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script>
export default {
  name: "home",
  components: {}
};
</script>


<style lang="scss" >

.home {
  width: 100%;
  // display: flex;
  // justify-content: center;
}
h1 {
  display: block;
}
td,th {
  padding: 0 5px !important;
}

</style>