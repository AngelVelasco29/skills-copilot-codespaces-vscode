function skillsMember() {
  var member = document.getElementById("member");
  var memberValue = member.options[member.selectedIndex].value;
  if (memberValue == "Yes") {
    document.getElementById("skills").style.display = "block";
  } else if (memberValue == "No") {
    document.getElementById("skills").style.display = "none";
  }
}