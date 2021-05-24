$(document).ready(function () {
  const jsonData =
    '{"surveyHeader":"Anket Başlığı","surveyDescription":"Anket Açıklaması","surveyMedia":"Anket Medya","surveyLang":"1","surveyOptions":[[{"pageType":"1","endText":"Kapanış Mesajı","redirectUrl":"Yönlenecek Link"}]],"Data": [{"surveyQuestionId":"surveyQuestionId1","surveyId":"temp","header":"Kısa Metin","type":"1","questionMedia":"Soru Medya","questionData":[],"otherquestion":"0","questionsOptions":[{"questionClass":"1","required":"1"}]},{"surveyQuestionId":"surveyQuestionId2","surveyId":"temp","header":"Paragraf","type":"2","questionMedia":"Soru Medya","questionData":[],"otherquestion":"0","questionsOptions":[{"questionClass":"2","required":"1"}]},{"surveyQuestionId":"surveyQuestionId3","surveyId":"temp","header":"Tarih","type":"3","questionMedia":"Soru Medya","questionData":[],"otherquestion":"0","questionsOptions":[{"questionClass":"3","required":"1"}]},{"surveyQuestionId":"surveyQuestionId4","surveyId":"temp","header":"Tarih (Saat)","type":"4","questionMedia":"Soru Medya","questionData":[],"otherquestion":"0","questionsOptions":[{"questionClass":"4","required":"1"}]},{"surveyQuestionId":"surveyQuestionId5","surveyId":"temp","header":"Dosya Yükleme","type":"5","questionMedia":"Soru Medya ","questionData":[],"otherquestion":"0","questionsOptions":[{"questionClass":"5","required":"1"}]},{"surveyQuestionId":"surveyQuestionId6","surveyId":"temp","header":"Eposta","type":"6","questionMedia":"Soru Medya","questionData":[],"otherquestion":"0","questionsOptions":[{"questionClass":"6","required":"1"}]},{"surveyQuestionId":"surveyQuestionId7","surveyId":"temp","header":"Telefon","type":"7","questionMedia":"Soru Medya","questionData":[],"otherquestion":"0","questionsOptions":[{"questionClass":"7","required":"0"}]},{"surveyQuestionId":"surveyQuestionId8","surveyId":"temp","header":"Değerlendirme","type":"8","questionMedia":"Soru Medya","questionData":[{"rankOneSelect":"1","rankTwoSelect":"7","ratingTextFirst":"Çok Kötü","ratingTextSecond":"Çok İyi"}],"otherquestion":"0","questionsOptions":[{"questionClass":"8","required":"1"}]},{"surveyQuestionId":"surveyQuestionId9","surveyId":"temp","header":"Çoklu Seçim","type":"9","questionMedia":"Soru Medya","questionData":[{"value":"1","content":"Çoklu Seçim 1","image":"Resim 1"},{"value":"2","content":"Çoklu Seçim 2","image":"Resim 2"},{"value":"3","content":"Çoklu Seçim 3","image":"Resim 3"}],"otherquestion":"1","questionsOptions":[{"questionClass":"9","required":"1"}]},{"surveyQuestionId":"surveyQuestionId10","surveyId":"temp","header":"Çoktan Seçmeli","type":"10","questionMedia":"Soru Medya","questionData":[{"value":"1","content":"Çoktan Seçmeli 1","image":"Resim 1"},{"value":"2","content":"Çoktan Seçmeli 2","image":"Resim 2"},{"value":"3","content":"Çoktan Seçmeli 3","image":"Resim 3"}],"otherquestion":"1","questionsOptions":[{"questionClass":"10","required":"1"}]},{"surveyQuestionId":"surveyQuestionId11","surveyId":"temp","header":"Açılır Menü","type":"11","questionMedia":"Soru Medya","questionData":[{"value":"1","content":"Açılır Menü 1"},{"value":"2","content":"Açılır Menü 2"},{"value":"3","content":"Açılır Menü 3"}],"otherquestion":"1","questionsOptions":[{"questionClass":"11","required":"1"}]}]}';

  //  fillSurvey(jsonData);
});

function fillSurvey(data) {
  var obj = JSON.parse(data);
  if (obj != null) {
    $("#surveyName").val(obj.surveyHeader);
    $("#surveyDescription").val(obj.surveyDescription);
    $("#surveyMedia").val(obj.surveyMedia);

    // for(i=0;i<11;i++){
    //     createdFunction();
    // }

    // setTimeout({
    //     fillTHEBOXES();
    // },500);
  }
}

function fillTHEBOXES() {}
