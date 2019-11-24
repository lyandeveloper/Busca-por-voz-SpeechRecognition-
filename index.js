var btnSpk = document.querySelector("#btn-spk");
var spkResult = document.querySelector("#spk-result");

//Checar se o navegador suporta o reconhecimento de voz
if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var myRecognition = new SpeechRecognition();

  myRecognition.lang = "pt-BR";

  //Quando clico no botão "Buscar" ele começa a ouvir
  btnSpk.addEventListener(
    "click",
    function() {
      try {
        myRecognition.start();
        spkResult.innerHTML = "Estou te ouvindo!";
      } catch (err) {
        alert("error" + err.message);
      }
    },
    false
  );

  //Pegar o resultado do que o usuário falou
  myRecognition.addEventListener(
    "result",
    function(evt) {
      var resultSpeak = evt.results[0][0].transcript;

      spkResult.innerHTML = resultSpeak;

      //Abre uma aba de pesquisa no google de acordo com que o usuário falou
      if (resultSpeak.match(/buscar por/)) {
        spkResult.innerHTML = "Redirecionando...";

        setTimeout(function() {
          var resultado = resultSpeak.split("buscar por");
          window.open(
            "https://www.google.com.br/search?q=" + resultado[1],
            "_blank"
          );

          spkResult.innerHTML = "Fale algo";
        }, 2000);
      } else {
        spkResult.innerHTML = "Redirecionando...";

        setTimeout(function() {
          window.open("https://" + resultSpeak, "_blank");

          spkResult.innerHTML = "Fale algo";
        }, 2000);
      }
    },
    false
  );

  //Caso o SpeechRecognition não consiga ouvir o que o usuário falou
  myRecognition.addEventListener(
    "error",
    function() {
      spkResult.innerHTML = "Não consegui ouvir! Fale novamente!";
    },
    false
  );
} else {
  spkResult.innerHTML = "Seu navegador não suporta o SpeechRecognition";
}
