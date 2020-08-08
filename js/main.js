$(document).ready(function () {
  var hotelSwiper = new Swiper(".swiper-container", {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button__next",
      prevEl: ".swiper-button__prev",
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  var reviewsSwiper = new Swiper(".reviews-slider", {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: ".reviews-button__next",
      prevEl: ".reviews-button__prev",
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  var menuButton = document.querySelector(".menu-button");
  menuButton.addEventListener("click", function () {
    console.log("Клик по кнопке меню");
    document
      .querySelector(".navbar-bottom")
      .classList.toggle("navbar-bottom__visible");
  });

  var modalButton = $("[data-toggle=modal]");
  var closeModalButton = $(".modal__close");
  modalButton.on("click", openModal);
  closeModalButton.on("click", closeModal);

  function openModal() {
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    modalOverlay.addClass("modal__overlay-visible");
    modalDialog.addClass("modal__dialog-visible");
  }

  function closeModal(event) {
    event.preventDefault();
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    modalOverlay.removeClass("modal__overlay-visible");
    modalDialog.removeClass("modal__dialog-visible");
  }

  $(document).on("keydown", function (e) {
    if (e.keyCode == 27) var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    modalOverlay.removeClass("modal__overlay-visible");
    modalDialog.removeClass("modal__dialog-visible");
  });

  // Отправка данных на сервер
  function send(event, php) {
    console.log("Отправка запроса");
    event.preventDefault();
    var req = new XMLHttpRequest();
    req.open("POST", php, true);
    req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
        json = JSON.parse(this.response); // Ебанный internet explorer 11
        console.log(json);

        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Если сообщение отправлено
          alert("Сообщение отправлено");
        } else {
          // Если произошла ошибка
          alert("Ошибка. Сообщение не отправлено");
        }
        // Если не удалось связаться с php файлом
      } else {
        alert("Ошибка сервера. Номер: " + req.status);
      }
    };

    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function () {
      alert("Ошибка отправки запроса");
    };
    req.send(new FormData(event.target));
  }
});

$(".form").each(function () {
  $(this).validate({
    errorClass: "invalid",
    rules: {
      email: true,
    },
    messages: {
      name: {
        required: "Укажите имя",
        minlength: "Имя должно быть не короче двух букв",
      },
      email: {
        required: "Нам нужна ваша почта для связи",
        email: "Формат почты name@domain.com",
        
      },
      phone: {
        required: "Телефон обязателен",
      },
    },
  });
});




$("#phone__us").mask("+7(000) 000-00-00");
$("#phone__us-modal").mask("+7(000) 000-00-00");


$(".map").mouseenter(function () {
  $(".map").append(
    '<iframe data-aload src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d143823.78876146488!2d37.24753281714559!3d55.71946476346786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b5481b0f9c9949%3A0x1aa05ec2e60a61bf!2sDoubleTree%20by%20Hilton%20Hotel%20Moscow%20-%20Marina!5e0!3m2!1sru!2sru!4v1596627080906!5m2!1sru!2sru" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>'
  );
});
