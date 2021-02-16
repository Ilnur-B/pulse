(function ($) {
  $(function () {
    $("ul.catalog__tabs").on(
      "click",
      "li:not(.catalog__btn_active)",
      function () {
        $(this)
          .addClass("catalog__btn_active")
          .siblings()
          .removeClass("catalog__btn_active")
          .closest("div.container")
          .find("div.catalog__products")
          .removeClass("catalog__products_active")
          .eq($(this).index())
          .addClass("catalog__products_active");
      }
    );

    function toggleSlide(btn) {
      $(btn).each(function (i) {
        $(this).on("click", function (e) {
          e.preventDefault();
          $(".catalog-item__product")
            .eq(i)
            .toggleClass("catalog-item__product_active");
          $(".catalog-item__descr")
            .eq(i)
            .toggleClass("catalog-item__descr_active");
        });
      });
    }
    toggleSlide(".catalog-item__link");
    toggleSlide(".catalog-item__back-btn");

    // modal

    $('[data-modal="consultation"]').on("click", function () {
      $(".modal-windows, #consultation").fadeIn(600);
    });
    $(".modal__close").on("click", function () {
      $(".modal-windows, #consultation").fadeOut();
    });

    $(".button_min").each(function (i) {
      $(this).on("click", function () {
        $(".modal__descr").text($(".catalog-item__subtitle").eq(i).text());
        $(".modal-windows, #order").fadeIn(600);
      });
    });

    //validation

    function formValidation(form) {
      $(form).validate({
        rules: {
          name: { required: true, minlength: 2 },
          phone: "required",
          email: { required: true, email: true },
        },
        messages: {
          name: {
            required: "пожалуйста, введите своё имя",
            minlength: jQuery.validator.format("минимальная длинн {0} символа"),
          },
          phone: "пожалуйста, введиет номе телефона",
          email: {
            required: "введите свой email",
            email: "введите адрс в правильном формате",
          },
        },
      });
    }
    formValidation("#consultation form");
    formValidation("#consult-form");
    formValidation("#order form");

    // mask input

    $('[name="phone"]').mask("+7(999) 999-99-99");

    // mailer

    $(".form").submit(function (e) {
      //у эл-та form при сабмите выполн функция
      e.preventDefault(); //отменяется ст-ное поведение
      $.ajax({
        //добавляется действие. используя метод ajax
        type: "POST", //наст-ки для запроса
        url: "mailer/smart.php", //адрес отправки запроса
        data: $(this).serialize(), // данные которые будут отправлены и преобразованы для сервера
      }).done(function () {
        //событие - завершения первого события и следующее событие
        $(this).find("input").val(""); //обнуление value внутри input
        $("#consultation, #order").fadeOut();
        $(".modal-windows, #thanks").fadeIn("slow");
        $("form").trigger("reset"); //метод очищает формы
      });
      return false; //
    });

    // $(".form").submit(function (e) {
    //   e.preventDefault();
    //   $.ajax({
    //     type: "POST",
    //     url: "mailer/smart.php",
    //     data: $(this).serialize(),
    //   }).done(function () {
    //     console.log("xdxdg");
    //     $(this).find("input").val("");
    //     $("#consultation, #order").fadeOut();
    //     $(".overlay, #thanks").fadeIn("slow");

    //     $("form").trigger("reset");
    //   });
    //   return false;
    // });

    // up-btn smooth scroll

    $(window).scroll(function () {
      if ($(this).scrollTop() > 1600) {
        $("#up-btn").fadeIn();
      } else {
        $("#up-btn").fadeOut();
      }
    });

    new WOW().init();
  });
})(jQuery);
