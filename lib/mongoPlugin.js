module.exports = {
  timePlugin (schema) {
    schema.add({created_at: String});
    schema.pre('save', function (next) {
      let nowTime = new Date();
      let month = nowTime.getMonth() > 9 ? nowTime.getMonth() : '0' + nowTime.getMonth();
      let day = nowTime.getDay() > 9 ? nowTime.getDay() : '0' + nowTime.getDay();
      let hours = nowTime.getHours() > 9 ? nowTime.getHours() : '0' + nowTime.getHours();
      let minutes = nowTime.getMinutes() > 9 ? nowTime.getMinutes() : '0' + nowTime.getMinutes();
      let nowDate = `${nowTime.getFullYear()}-${month}-${day} ${hours}:${minutes}`;
      if (!this.created_at) {
        this.created_at = nowDate;
      }
      this.updated_at = nowDate;
      next();
    });
  }
};

