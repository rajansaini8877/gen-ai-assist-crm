
$(document).ready(function () {
  $("tr.work-item-row").click(function (e) {
    const workItemNumber = this.childNodes[1].innerHTML.trim();
    $(`form#work-item-form-${workItemNumber}`).submit();
  });

  $("tr.case-row").click(function (e) {
    const caseNumber = this.childNodes[1].innerHTML.trim();
    $(`form#case-form-${caseNumber}`).submit();
  });

  $("tr.event-row").click(function (e) {
    const eventNumber = this.childNodes[1].innerHTML.trim();
    $(`form#event-form-${eventNumber}`).submit();
  });
});
