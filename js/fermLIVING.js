$(document).ready(function(){
favBtnClick();
panelToggle();
tabToggle();
popUp();
closeButton();
numberOnly();
cartCalc();
loadWindow();
accordion("footer > div:nth-child(2) > ul > li", "footer > div:nth-child(2) > ul > li > ul");
accordion(".accordion > li", ".accordion > li > div");
accordion("nav ul li", "nav ul li > div");
accordion("div.listArea > aside > div", "div.listArea > aside > div > h2+*");
accordion("[class^='acnt'] > aside > div", "[class^='acnt'] > aside > div > h2+*");
cartDelete();
notform();
scrollMove();
scrollMove2();
filterToggle();
indexSlider();
listSlider();
detailSlider();
heartBtn();
backBtn();
detailCount();
selectInput();
$("#newAddress button.reversalBtn").on("click",addAddress);
deleteAddress();
editAddress();
$(document).on("click","button[data-panel^='editAddress']",editAddress);
deleteFavitem();
checkOutCalc();
checkOutDelete();
submitBtn();
fileText();
slideAccordion();
claimProcess();
cardImg();
muisubNav();
muiScroll();
});
function muiScroll(){
  var prev=0;
  var header=227;
  $(window).scroll(function(){
    if($(window).width() < 767){
      var current=$(this).scrollTop();
      if(current>prev && current > header){
        $("header").css("top","-"+header+"px");
      }else{
        $("header").css("top","0");
      }
      prev=current;
    }else{
      $("header").css("top","0");
    }
  });
}
function muisubNav(){
  $(document).on("click","[data-mui]",function(){
    var targetId = $(this).data("mui");
    $("#"+targetId).slideToggle(300);
    $("#"+targetId).siblings("input").toggleClass("active");
  });
}
function cardImg(){
    $("[class^='chkoutPay'] #creditCard ul li:first-child > input[type='text']").keyup(function(){
        var cardNum = $(this).val().substring(0,1);
        var card = $("[class^='chkoutPay'] > section > div:nth-of-type(2) > form > div:first-of-type");

        switch(cardNum){
            case "3" :
                card.css("background-image","url('../images/visacard.svg')");
                break;
            case "4" :
                card.css("background-image","url('../images/discovercard.svg')");
                break;
            case "5" :
                card.css("background-image","url('../images/mastercard.svg')");
                break;
            default:
                card.css("background-image","url('../images/amexcard.svg')");
                break;
        }
    });
}
function claimProcess(){
  $("#claimForm").on("submit",function(e){
    e.preventDefault();
    $("#ok_processing_Popup").addClass("active");

    $("#ok_processing_Popup > input[value='OK']").on("click",function(){
      $("#claimForm").off().submit();
    });
  });
}
function slideAccordion(){
  $("[class^='ftcs'] article ol li").on("click",function(e){

    if ($(e.target).closest("table").length) return;

    var $content=$(this).children("div");
    var $li=$(this).closest("li");

    if($li.hasClass("rotate")){
      $content.stop(true, true).slideToggle(500);
      $li.toggleClass("rotate");
    }else{
      $("[class^='ftcs'] article ol li > div").not($content).stop(true,true).slideUp(300);
      $("[class^='ftcs'] article ol li").not(this).removeClass("rotate");

      $content.stop(true, true).slideDown(500);
      $li.addClass("rotate");
    }
  });
}
function fileText(){
  $("#fileUpload").on("change",function(){
    var fileName=$(this).val().split("\\").pop();
      if(fileName){
        $(".fileName").text(fileName);
        $(".fileName").css("color","#26211b");
      }else{
        $(".fileName").text("Please select a file to attach");
        $(".fileName").css("color","#d1ccc6");
      }
  });
}
function submitBtn(){
  $(".ckSubmit").on("click",function(e){
    e.preventDefault();
    var $form = $("form");
    if($("#delivery").is(":checked")){
      $form.attr("action", "jc_checkout_shipping1.html");
    }else if($("#pickup").is(":checked")){
      $form.attr("action", "jc_checkout_shipping2.html");
    }
    $form.submit();
  });
}
function deleteFavitem(){
  var $thisitem=null;

  $("button[data-popup='dltFav_Popup']").on("click",function(){
    $thisitem=$(this).parents("li");
  });
  $("div#dltFav_Popup > input[value='Delete']").on("click",function(){
  $thisitem.remove();
  var count=$("div.acntFavArea > div ul > li").length;
  $("span.count").text(count);
  $("#dltFav_Popup").removeClass("active");
  $(".clearMsg").addClass("active");
  });
}
function deleteAddress(){
  var $thisAddress=null;
  $(document).on("click","button[data-popup='dltAd_Popup']",function(){
    $thisAddress = $(this).closest(".origin");
  });

  $(document).on("click","div#dltAd_Popup > input[value='Delete']",function(){
    if($thisAddress){
      $thisAddress.remove();
      $("#dltAd_Popup").removeClass("active");
      $thisAddress = null;
    }
  });
}
function editAddress(){
  var $origin=$(this).parents(".origin");

  var $data=$origin.find("ul li");

  var fullName=$data.eq(0).text();
  var address1=$data.eq(1).text();
  var zipCity=$data.eq(2).text();
  var country=$data.eq(3).text();

  var fName=fullName.split(" ")[0];
  var lName=fullName.split(" ")[1];

  var zip=zipCity.split(" ")[0];
  var city=zipCity.split(" ")[1];

  var $editAddress=$origin.find("div[id^='editAddress']");
  $editAddress.find("input[id^='editFn']").val(fName);
  $editAddress.find("input[id^='editLn']").val(lName);
  $editAddress.find("input[id^='editAddress1']").val(address1);  
  $editAddress.find("input[id^='editZip']").val(zip);
  $editAddress.find("input[id^='editCity']").val(city);
  $editAddress.find("[id^='editCountry'] li.active").text(country);

  $editAddress.addClass("active");

  $editAddress.find("button.updateBtn").off("click.update").on("click.update",function(){
    var fName=$editAddress.find("input[id^='editFn']").val();
    var lName=$editAddress.find("input[id^='editLn']").val();
    var address1=$editAddress.find("input[id^='editAddress1']").val();
    var zip = $editAddress.find("input[id^='editZip']").val();
    var city = $editAddress.find("input[id^='editCity']").val();
    var country = $editAddress.find("[id^='editCountry'] li.active").text();

    $data.eq(0).text(fName+" "+lName);
    $data.eq(1).text(address1);
    $data.eq(2).text(zip+" "+city);
    $data.eq(3).text(country);

    $editAddress.removeClass("active");
  });
}
var cloneCounter=0;
function addAddress(){
  cloneCounter++;
  var $origin=$("div.origin").first().clone(false);
  
  $origin.find("[id]").each(function(){
    var id=$(this).attr("id");
    $(this).attr("id",id+"_"+cloneCounter);
  });
  $origin.find("label[for]").each(function(){
    var labelId=$(this).attr("for");
    $(this).attr("for",labelId+"_"+cloneCounter);
  });
  $origin.find("button[data-panel='editAddress']").attr("data-panel", "editAddress_"+cloneCounter);
  $origin.find("#editAddress").attr("id", "editAddress_"+cloneCounter);

  var $firstName = $("#newFn").val();
  var $lastName = $("#newLn").val();
  var $address1 = $("#newAddress1").val();
  var $city = $("#newCity").val();
  var $country = $("#newCountry li.active").text();
  var $zip = $("#newZip").val();

  var $clone=$origin.find("ul li");
  $clone.eq(0).text($firstName+" "+$lastName);
  $clone.eq(1).text($address1);
  $clone.eq(2).text($zip+" "+$city);
  $clone.eq(3).text($country);

  $("div.origin").last().after($origin);

  $("#newAddress input[type='text']").val(""); 
}
function selectInput(){
  $(document).on("click",".select",function(e){
    $(this).toggleClass("active");
  });
  $(document).on("click",".select li",function(e){
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
}
function backBtn(){
  $(".backBtn").on("click",function(){
    history.back();
  });
}
function detailSlider(){

  if(window.matchMedia('(max-width: 1279px)').matches){
    $(".detailArea ul.detail_slider").bxSlider({
      mode: 'horizontal', 
      speed: 900,
      minSlides: 1,
      maxSlides: 1,
      slideWidth: 825,
      moveSlides: 1,
      pager: true,
      infiniteLoop: false,
      responsive: true,
      adaptiveHeight: true,
      hideControlOnEnd: true
    });
  }else{
    $(".detailArea ul.detail_slider").bxSlider({
      mode: 'vertical', 
      speed: 900,
      minSlides: 1,
      maxSlides: 1,
      slideWidth: 825,
      moveSlides: 1,
      pager: true,
      infiniteLoop: false,
      responsive: true,
      controls: false
    });
  }

}
function indexSlider(){
  var tabSlider1=$(".tabSlider1").bxSlider({
    speed: 900,
    minSlides: 1,
    maxSlides: 4,
    slideWidth: 440,
    slideMargin: 40,
    moveSlides: 1,
    pager: true,
    infiniteLoop: false,
    hideControlOnEnd: true,
    shrinkItems: true
  });
  var tabSlider2=$(".tabSlider2").bxSlider({
    speed: 900,
    minSlides: 1,
    maxSlides: 4,
    slideWidth: 440,
    slideMargin: 40,
    moveSlides: 1,
    pager: true,
    infiniteLoop: false,
    hideControlOnEnd: true,
    shrinkItems: true
  })
  var tabSlider3=$(".tabSlider3").bxSlider({
    speed: 900,
    minSlides: 1,
    maxSlides: 4,
    slideWidth: 440,
    slideMargin: 40,
    moveSlides: 1,
    pager: true,
    infiniteLoop: false,
    hideControlOnEnd: true,
    shrinkItems: true
  });
  var tabBtn=$(".tabUI li");
  var currentTab= '';
  var tabContent=$(".tabContent");
  var currentSlider= '';
  $(".tabUI li:first-of-type").addClass("active");

  tabBtn.click(function(){
    tabContent.removeClass("active");
    currentTab="#"+$(this).text().replace(/\s/g, "").replace(/[^a-zA-Z0-9]/g, "");
    $(currentTab).addClass("active");
    tabBtn.removeClass("active");
     $(this).addClass("active");

    currentSlider=$(this).attr("data-slider");
    
    if(currentSlider == "tabSlider1"){
      tabSlider1.reloadSlider();
    }else if(currentSlider == "tabSlider2"){
      tabSlider2.reloadSlider();
    }else if(currentSlider == "tabSlider3"){
      tabSlider3.reloadSlider();
    }
  });
}
function listSlider(){
   $(".listArea ul.list_slider").bxSlider({
     speed: 900,
     minSlides: 1,
     maxSlides: 2,
     moveSlides: 1,
     slideMargin: 40,
     pager: true,
     infiniteLoop: false,
     hideControlOnEnd: true
   });
}
function scrollMove2(){
  $(window).on("scroll",function(){
    $("div.aboutArea > article > figure > img:last-of-type").each(function(){
      var img = $(this);
      var imgTop = img.offset().top;
      var windowBottom = $(window).scrollTop()+$(window).height();

      if(windowBottom > imgTop + 500 && !img.hasClass("move")){
        img.addClass("move");
      }
    });
  });
}
function scrollMove(){
  $(window).on("scroll",function(){
    $("main > section:nth-child(3) > ol > li > figure > figcaption").each(function(index){
      var box=$(this);
      var boxTop=box.offset().top;
      var windowbottom=$(window).scrollTop()+$(window).height();

      if(windowbottom > boxTop + 50 && !box.hasClass("move")){
        box.addClass("move");
        (function(box,delay){
          setTimeout(function(){
            box.css({
              right:"-20px",
              opacity: 1
            });
          },delay);
        })(box,index*25);
      }
    });
  });
}
function accordion(accordion,item){
  $(accordion).on("click",function(){
    var $content=$(this).children(item);

    if($content.hasClass("active")){
      $content.removeClass("active");
      $(this).removeClass("rotate");
    }else{
      $content.addClass("active");
      $(this).addClass("rotate");
    }
  });
}
function loadWindow(){
  $("main > div:first-child > div").addClass("active");
  $("#ok_welcome_Popup").addClass("active");
}
function favBtnClick(){
  $(".favBtn").click(function(){
    console.log("like jennie")
    if($(this).text()=="Add to Favorites"){
      $(this).text("Remove from Favorites");
    }
    else{
      $(this).text("Add to Favorites");
    }
  });
}
function heartBtn(){
  $("button.heartBtn").click(function(){
    $(this).toggleClass("active");
  });
}
function filterToggle(){
  $("[data-filter]").click(function(){
    var targetId = $(this).data("filter");
    var $targetfilter = $("#"+targetId);
    $(this).toggleClass("active");
    $targetfilter.toggleClass("active");
  });
}
function panelToggle(){
  $(document).on("click","[data-panel]",function(){
    var targetId = $(this).data("panel");
    $("#"+targetId).addClass("active");
  });
    $(document).on("click", ".closeBtn", function(){
    $(this).closest("[id]").removeClass("active");
  });

  $(document).on("keydown", function(e){
    if (e.key === "Escape" || e.keyCode === 27){
      $(".active").removeClass("active");
    }
  });
}
function tabToggle(){
  $(".tabs").on("click","[data-tab]",function(){
    var tabId=$(this).data("tab");
    var tabGroup=$(this).closest(".tabs");
    var current=tabGroup.find("[id].active");
    var next=tabGroup.find("#"+tabId);
    if (next[0] === current[0]) return;
    tabGroup.find("[data-tab]").removeClass("active");
    $(this).addClass("active");
    current.removeClass("active");
    next.addClass("active");
  });
}
function popUp(){
  $(document).on("click","[data-popup]",function(){
    var targetId = $(this).data("popup");
    $("#"+targetId).addClass("active");
  });
}
function closeButton(){
  $(document).on("click",".closeBtn",function(){
    $(this).parent("div[id$='Popup']").removeClass("active");
  })
}
function numberOnly(){
  $("input.numberOnly").on("keyup",function(){
    $(this).val($(this).val().replace(/[^0-9]/g,""));
  });
}
function checkOutCalc(){
    var qty = 0;
    $("input[value='cartMinus']").on('click', function(){
            var $product = $(this).parents('li');
            qty = parseInt($product.find("input[type='number']").val());
            basePrice = parseInt($product.find("b.price").text());
            
            var total = parseInt($("b.total").text());
            if(qty == 1){
                return;
            }else{
                qty--
                $product.find("input[type='number']").val(qty);
                total -= basePrice;
                $("b.total").text(total);
            }
    })
    $("input[value='cartPlus']").on('click', function(){
        var $product = $(this).parents('li');
        qty = parseInt($product.find("input[type='number']").val());
        basePrice = parseInt($product.find("b.price").text());
        var total = parseInt($("b.total").text());
        if(qty == 5){
            return;
        }else{
            qty++
            $product.find("input[type='number']").val(qty);
            total += basePrice;
            $("b.total").text(total);
        }
    })
}
function checkOutDelete(){
  var $thisProduct=null;
  var qty=0;
  $("button[data-popup='dltCkout_Popup']").on("click",function(){
    $thisProduct=$(this).parents("li");
  });
  $("#dltCkout_Popup > input[value='Delete']").on("click",function(){
    if($thisProduct){
      var $total=parseInt($("b.total").text());
      var $thisPrice=parseInt($thisProduct.find("b.price").text());
      var qty=parseInt($thisProduct.find("input[type='number']").val());
      $total=$total-$thisPrice*qty;
      $("b.total").text($total);

      var $parent = $thisProduct.parent();
      $thisProduct.remove();
      
      var $count=$parent.children("li").not("li.listTotal").length;
      if($count===0){
        $("p.clearMsg").addClass("active");
      }
      $thisProduct=null;
    }

    $("#dltCkout_Popup").removeClass("active");
  });
}
function detailCount(){
  var qty=0;
  $(".qtyComponent > input[value='quantityMinus']").on("click",function(){
    qty=$(this).siblings("input[type='number']").val();
    if(qty==1){
      return;
    }else{
      qty--
      $(this).siblings("input[type='number']").val(qty);
    }
  });
  $(".qtyComponent > input[value='quantityPlus']").on("click",function(){
    qty=$(this).siblings("input[type='number']").val();
    if(qty==5){
      return;
    }else{
      qty++
      $(this).siblings("input[type='number']").val(qty);
    }
  });
}
function cartCalc(){
    var qty = 0;
    var subtotal = 0;
    $("input[value='quantityMinus']").on('click', function(){
            var $product = $(this).closest('li');
            qty = parseInt($product.find("input[type='number']").val());
            basePrice = parseInt($product.find("span.basePrice").text())/qty;
            var total = parseInt($("span.totalPrice").text());
            if(qty == 1){
                return;
            }else{
                qty--
                $product.find("input[type='number']").val(qty);
                subtotal=basePrice*qty;
                total -= basePrice;
                $product.find("span.basePrice").text(subtotal);
                $("span.totalPrice").text(total);
            }
    })
    $("input[value='quantityPlus']").on('click', function(){
        var $product = $(this).closest('li');
        qty = parseInt($product.find("input[type='number']").val());
        basePrice = parseInt($product.find("span.basePrice").text())/qty;
        var total = parseInt($("span.totalPrice").text());
        if(qty == 5){
            return;
        }else{
            qty++
            $product.find("input[type='number']").val(qty);
            subtotal=basePrice*qty;
            total += basePrice;
            $product.find("span.basePrice").text(subtotal);
            $("span.totalPrice").text(total);
        }
    })
}
function cartDelete(){
  var $thisProduct=null;
  
  $("input[value='Remove']").on("click",function(){
    $thisProduct=$(this).closest("li");
  });
  $("#dltCart_Popup > input[value='Delete']").on("click",function(){
    if($thisProduct){
      var $total=parseInt($("span.totalPrice").text());
      $thisPrice=parseInt($thisProduct.find("span.basePrice").text());
      $total=$total-$thisPrice;
      $("span.totalPrice").text($total);

      $thisProduct.remove();
      $thisProduct=null;

      var count=$("#cart form div ul li").length;
      $("span.count").text(count);

      if(count===0){
        $("p.emptyCart").addClass("active");
        $("#cart form > div:last-child").remove();
        $("#cart input[type='submit']").remove();
        $("#cart form > div:nth-child(2) >*:not(p)").remove();
      }
    } 
    $("#dltCart_Popup").removeClass("active");
  });
}
function notform(){
  $("footer form").on('submit',function(event){
    event.preventDefault();

    var email = $('#userEmail').val().trim();
    console.log(email);
    if (email === "" || /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/.test(email)){
      return;
    }else{
      $('#ok_processing_Popup').addClass("active");
    }
  });
}