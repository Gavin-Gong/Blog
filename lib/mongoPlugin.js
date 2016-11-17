// TODO　add moment module
module.exports = {
  timePlugin (schema) {
    schema.add({created_at: String});
    schema.pre('save', function (next) {
      var nowDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      if (!this.created_at) {
        this.created_at = nowDate;
      }
      this.updated_at = nowDate;
      next();
    });
  }
};

