function fnTrapKD(btn, event){
    if (document.all){
     if (event.keyCode == 13){
      event.returnValue=false;
      event.cancel = true;
      btn.click();
     }
    }
    else if (document.getElementById){
     if (event.which == 13){
      event.returnValue=false;
      event.cancel = true;
      btn.click();
     }
    }
    else if(document.layers){
     if(event.which == 13){
      event.returnValue=false;
      event.cancel = true;
      btn.click();
     }
    }
   }
   
   //Niketa: To ensure that textareas/textboxes with multiline on dont exceed thier maxlength
   function chkTextEntered(field,maxlimit) 
   {
       if ( field.value.length > maxlimit )
       {
           field.value = field.value.substring( 0, maxlimit );
           alert("This is the maximum amount of data allowed for this field.");
           return false;
       }
   }
   
   // PE (PMI): textbox filter function (Aplha, AlphaNumeric, Numeric etc.)
   // Replaces AJAX FilerTextBoxExtender control
   // enter -1 for min and max values if you do not wish these to be applied
   function CustomFilterExtender(control, e, AllowedValues, minValue, maxValue)
   {
       var validValue = control.value ;
       // we will carry out max/min validation checks on temp value
       var tempValue = control.value ;
       //controlToValidate.value = "" ;
       //alert(controlToValidate.value) ;
       var keynum;
       var keychar;
       var numcheck;
       
       keynum = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
       
       if(keynum < 47)
       {
           return;
       }
           
       keychar = String.fromCharCode(keynum) ;
   
       // following 2 lines carry out numeric check only
       //numcheck = /\d/
       //return numcheck.test(keychar)
       
       // Any values contained in the AllowedValues param are OK
       var checkOK = AllowedValues ;
       var result = false ;
   
       // loop through valid characters
       for (i = 0;  i < checkOK.length;  i++)
       {
           if (keychar == checkOK.charAt(i))
           {
               tempValue += keychar ;
               result = true ;
           }
       }
     
       // check minimum and maximum
       if (minValue != -1 || maxValue != -1)
       {  
           // only numeric values can have min/max checks
           if (AllowedValues == "0123456789" || AllowedValues == "1234567890")
           {   
               if (tempValue != "")
               {
                   result = false ;
                   var prsVal = parseInt(tempValue);
                   if (prsVal >= minValue && prsVal <= maxValue)
                   {    
                       result = true ;
                   }
                   else
                   {
                       alert("Please specify a value within the range " + minValue + " - " + maxValue) ;
                       tempValue = validValue ;
                       result = false ;
                   }
               }
           }
       }
       return result ;
       
   }
   
   // function enables expanding and collapsing of div tags
   // Replaces AJAX Accordian control, please ensure naming convention for headers and divs
   // tags must be named expandDiv1, expandDiv2, expandDiv3 and so on
   // see DetailedApp.aspx for example implementation
   // see Journal.aspx for dynamic example implementation
   function ExpandDiv(divControl, divCount)
   {
       // expand div control passed
       document.all[divControl].style.height = "100%" ;
       // collapse the rest
       
       for(var i = 1; i <= divCount; i++)
       {
           if(document.all["expandDiv" + i] == null)
           {
               continue;
           }
           if (document.all["expandDiv" + i].id != divControl)
               document.all["expandDiv" + i].style.height = "0px" ; 
       }
   }
   // incase we are creating the divs dynamically inside a content 
   // place holder then we will have to pass the ASPNET asigned client ID
   function ExpandDiv2(divControl, divCount, clientIDPrefix)
   {
       // expand div control passed
       var expandDiv = document.getElementById(divControl);
       expandDiv.style.height = "100%" ;
       
       // collapse the rest	
       for(var i = 1; i <= divCount; i++)
       {
           var colapseDivClientID = (clientIDPrefix + i);
           if(divControl != colapseDivClientID)
           {
               var colapseDiv = document.getElementById(colapseDivClientID);
               colapseDiv.style.height = "0px" ;
           }
       }
   }
   
   // Replace AJAX CollapiblePanel control
   // see StickerStatus.ascx for example implementation
   // expandImage - clickable image to expand the control
   // collapseImage - clickable image to collaps the control
   // targetControl - control to collapse/expand
   // visibilityControl - hidden field indicating if the targetcontrol is collapsed/expanded across postbacks
   // bExpand - value indicating if expanding or collapsing
   function ExpandCollapseCntrl(expandImage, collapseImage, targetControl, visibilityControl, bExpand)
   {
       if (bExpand == "true")
       {
           document.all[collapseImage].style.height = "100%" ;
           document.all[expandImage].style.height = "0px" ;
           document.all[targetControl].style.height = "100%" ;
           document.all[visibilityControl].value = "1";
       }
       else
       {
           document.all[collapseImage].style.height = "0px" ;
           document.all[expandImage].style.height = "100%" ;
           document.all[targetControl].style.height = "0px" ;
           document.all[visibilityControl].value = "0";
       }
   }
   
   function DisableButton()
           {
           window.setTimeout("disableButton('" + 
                      window.event.srcElement.id + "')", 0);
           }
           
   function disableButton(buttonID) 
       {
           var button = document.getElementById(buttonID);
           if(button != null)
           {
               button.disabled=true;
           }
       }
       
   /* Date Mask functions */
   
   /* Clear Water Mark & change forecolour */
   function ClearDateField(dtControl)
   {
       if (document.getElementById(dtControl).value == "dd/mm/yyyy")
       {
            document.getElementById(dtControl).value = "" ;
       }
   }
   /* Restore Water Mark & forecolour if empty */
   function ResetWaterMark(dtControl)
   {
       if (document.getElementById(dtControl).value == "")
       {
           document.getElementById(dtControl).value = "dd/mm/yyyy" ;
       }
   }
   /* Clear Water Mark on submit */
   /*****************************************
   WARNING:    
   CustomValidator control id must be "cv" + the 
   ControlToValidate ID i.e. if the ID of the 
   ControlToValidate is "txtDOB", the ID of the 
   CustomValidator must be "cvtxtDOB".
   Common function SetCustomDateMask does this
   automatically as CustVal is passed as param
   ******************************************/
   function ClearWaterMark(sender, args)
   {
           var controlToValidate = sender.id.replace("cv", "") ;
       
       if (args.Value == "dd/mm/yyyy")
       {
           if (document.getElementById(controlToValidate) != null)
           {
               document.getElementById(controlToValidate).value = "" ;
           }
           args.IsValid = true ;
       }
       // added to check than the year is on 4 digits
       else //user has entered something
       {
           if (args.Value.length != 10)
           {
               args.IsValid = false ;
           }
           else
           {
               args.IsValid = true ;
           }
       }
       return ;
   }
   function CheckDateRequired(sender, args)
   {
       if (args.Value == "dd/mm/yyyy" || args.Value == "")
       {
           var controlToValidate = sender.id.replace("cv", "") ;
           if (document.getElementById(controlToValidate) != null)
               document.getElementById(controlToValidate).value = "" ;
               
           args.IsValid = false ;
           return ;
       }
       // added to check than the year is on 4 digits
       else
       {
           if (args.Value.length != 10)
           {
               args.IsValid = false ;
           }
       }
   }
   
   // PE (PMI): date textbox filter function (dd/mm/yyyy)
   function DateExtender(control, e, AllowedValues)
   {
       var dateValue = document.getElementById(control).value ;
       //alert(dateValue) ;
       var result = false ;
       var enterSlash = false ;
       //if (dateValue.length < 10)
       //{
           // in case back-space is hit then more numeric values entered
           /*
           if ((dateValue.length == 2 && dateValue.indexOf("/") == -1) || dateValue.length == 5)
           {
               dateValue += "/" ;
           }
           */
           //controlToValidate.value = "" ;
           //alert(controlToValidate.value) ;
           var keynum;
           var keychar;
           var numcheck;
           var tempValue = -1 ;
           
           keynum = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
                   
           //keynum with number less then 47 are empty character keys like backspace, enter, esc et.
           if(keynum < 47)
           {
               return;
           }
           keychar = String.fromCharCode(keynum) ;
   
           // following 2 lines carry out numeric check only
           //numcheck = /\d/
           //return numcheck.test(keychar)
           
           // Any values contained in the AllowedValues param are OK
           var checkOK = AllowedValues ;
   
           // loop through valid characters
           for (i = 0;  i < checkOK.length;  i++)
           {
               if (keychar == checkOK.charAt(i))
               {
                   result = true ;
                   // auto populate slash
                   if (dateValue.length == 1 || dateValue.length == 4)
                   {
                       dateValue += keychar + "/" ;
                       enterSlash = true ;
                   }
                   else if ((dateValue.length == 2 && dateValue.indexOf("/") == -1) || (dateValue.length == 5 && dateValue.split("/").length < 3))
                   {
                       dateValue += "/" + keychar ;
                       enterSlash = true ;
                   }
               }
           }
       //}
       
       // in case user attempts to enter a day or month of 1-9 (without the preceding 0) and press "/" themselves
       
       if (dateValue.length == 1 && keychar == "/" && dateValue != "0")
       {
           dateValue = "0" + dateValue + "/" ;
           enterSlash = true ;
       }
       else if (dateValue.length == 4 && keychar == "/")
       {
           var date_array = dateValue.split("/");
           if (date_array[1] != "0")
               dateValue = date_array[0] + "/0" + date_array[1] + "/" ;
           enterSlash = true ;
       }   
       
       if (enterSlash == true)
       {
           document.getElementById(control).value = dateValue ;
           return false ;
       }
       else
       {
           return result ;
       }
   }
   
   function CheckDateFormat(control)
   {   
       var dateValue = document.getElementById(control).value ;
       var components = dateValue.split("/") ;
       //alert(components.length) ;
       
       if (components.length == 2)
       {
           var day = components[0] ;
           var month = components[1] ;
           if (day.length > 2 || month.length > 2)
           {
               if (day.length > 2)
               {
                  day = components[0].substr(0, 2) ;
                  //month = components[0].substr(2, 1) + month ;
                  month = components[0].substr(2, 1) ;
               } 
               if (month.length > 2)
               {
                   month = month.substr(0, 2) ;
               }   
               document.getElementById(control).value = day + "/" + month ;
           }
       }
       else if (components.length == 3)
       {
           var day = components[0] ;
           var month = components[1] ;
           var year = components[2] ;
           if (day.length > 2 || month.length > 2 || year.length > 4)
           {
               if (day.length > 2)
               {
                  day = components[0].substr(0, 2) ;
                  month = components[0].substr(2, 1) ;
                  //month = components[0].substr(2, 1) + month ;
                  document.getElementById(control).value = day + "/" + month  ;
               }  
               if (month.length > 2)
               {
                   month = month.substr(0, 2) ;
                   //year = components[1].substr(2, 1) + year ;
                   year = components[1].substr(2, 1) ;
                   
                   document.getElementById(control).value = day + "/" + month + "/" + year ;
               }
               if (year.length > 4)
               {
                   year = components[2].substr(0, 4) ;
                   
                   document.getElementById(control).value = day + "/" + month + "/" + year ;
               }    
            }
       }  
       //alert("Test") ;
   }
   
   // Added 27/09/2007 by Anthony Chou
   // This function was added in relation with bug id 704 (Validation on numerical fields); we could paste text in some numeric fields.
   // This function clears the control if it contains something else than numbers.
   function IsNumeric(control)
   //  check for valid numeric strings	
   {
       var strString = control.value.replace(/^\s+|\s+$/g, ''); // equivalent of trim(control.value)
       var strValidChars = "0123456789";
       var strChar;
       var blnResult = true;
       var pos = Cursor_GetPos(control); //We save the position of the cursor
       
       //  test strString consists of valid characters listed above
       for (i = 0; i < strString.length && blnResult == true; i++)
       {
           strChar = strString.charAt(i);
           if (strValidChars.indexOf(strChar) == -1)
           {
               blnResult = false;
           }
       }
       
       if (!blnResult)
       {
           control.value = "";
       }
       else
       {
           control.value = strString; // with no blanks
       }
   
       Cursor_SetPos(control,pos);//We set the cursor where it was before
   
       return blnResult;
   }
   
   function ChangeWindowLocation(url)
   {
       window.location=url;
   }
   
   // This function trims the string from left and right
   function Trim(stringToTrim) {
       return stringToTrim.replace(/^\s+|\s+$/g,"");
   }
   
   function GetStringWidth(stringToCheck,rulerSpan) 
   { 
       if (rulerSpan != null) 
       { 
           rulerSpan.innerHTML = stringToCheck; 
           return rulerSpan.offsetWidth; 
       } 
       return -1;
   }
   
   function CheckTextLengthFocus(maxLimit,checkControl,rulerControl,setFocus)
   {
       if(checkControl.value.length <= 0)
       {
           return true;
       }
       
       if(checkControl == null)
       {
           return false;
       }
       
       var textLength = GetStringWidth(checkControl.value,rulerControl);    
       
       var pos;
       if(setFocus)
       {
           pos = Cursor_GetPos(checkControl);
           var KeyID = (window.event) ? event.keyCode : e.keyCode;
          
           //If the user enters two spaces
           if ( pos > 1 && KeyID == 32 && checkControl.value.charAt(pos-1) == " " && checkControl.value.charAt(pos-2) == " ")
           {
               pos--;
           }
       }
       
       var returnValue = false;
       if(textLength < 0 || textLength > maxLimit)
       {
           checkControl.value = RemoveOverLimitCharacters(maxLimit, rulerControl.innerHTML, rulerControl);
           returnValue = false;
       }
       else
       {
           checkControl.value = rulerControl.innerHTML;
           returnValue = true;
       } 
       
       if(setFocus)
       {
           Cursor_SetPos(checkControl,pos);
       }    
       return returnValue;
   }
   
   function CheckTextLength(maxLimit,checkControl,rulerControl)
   {   
       CheckTextLengthFocus(maxLimit,checkControl,rulerControl,true);    
   }
   
   function CheckTextLengthNameAndSurname(maxLimit,checkControl,secondControl,rulerControl)
   {
       if(checkControl.value.length <= 0)
       {
           return true;
       }    
      
       if(secondControl == null)
       {
           return false;
       }
      
       var textToCheck = secondControl.value + ', ' + checkControl.value;
   
       var textLength = GetStringWidth(textToCheck,rulerControl); 
       var pos = Cursor_GetPos(checkControl);
       var KeyID = (window.event) ? event.keyCode : e.keyCode;
      
       //If the user enters two spaces
       if ( pos > 1 && KeyID == 32 && checkControl.value.charAt(pos-1) == " " && checkControl.value.charAt(pos-2) == " ")
       {
           pos--;
       }
       if(textLength < 0 || textLength > maxLimit)
       {
           var numberOfRemovedCharacters = GetNumberOfOverLimitCharacters(maxLimit, rulerControl.innerHTML, rulerControl);
           rulerControl.innerHTML = checkControl.value.substring( 0, checkControl.value.length - numberOfRemovedCharacters);
           checkControl.value = rulerControl.innerHTML;
           Cursor_SetPos(checkControl,pos);
           return false;
       }
       else
       {
           // remove double spaces
           rulerControl.innerHTML = checkControl.value;
           checkControl.value = rulerControl.innerHTML;
           Cursor_SetPos(checkControl,pos);
           return true;
       }    
   }
   
   function GetNumberOfOverLimitCharacters(maxLimit, stringToCut, rulerControl)
   {
       var countOfRemovedCharacters = 0;
       while(maxLimit < GetStringWidth(stringToCut,rulerControl) && stringToCut.length > 0)
       {
           countOfRemovedCharacters++;
           stringToCut = stringToCut.substring( 0, stringToCut.length - 1);
       }
       
       return countOfRemovedCharacters;
   }
   
   function RemoveOverLimitCharacters(maxLimit, stringToCut, rulerControl)
   {
       while(maxLimit < GetStringWidth(stringToCut,rulerControl) && stringToCut.length > 0)
       {
           stringToCut = stringToCut.substring( 0, stringToCut.length - 1);
       }
       
       return stringToCut;
   }
   
   // Added the 08/11/2007
   // Allows to get  the position of the cursor in a textField
   function Cursor_GetPos( where_, pos_)
   {
       var Obj= where_;
       var overflow = false;
   
       if( Obj )
       {
           //-- Focus on Object
           Obj.focus();
           if(typeof Obj.selectionStart != "undefined")
           {
               return Obj.selectionStart;
           }    
           else
           { 
             //If the control is full we need to change the maxlength to calculate the position  
             if ( (Obj.getAttribute("maxLength") - Obj.value.length) <= 1 )
             {
                 Obj.maxLength = Obj.maxLength + 2;
                 overflow = true;
             }
             
             // IE and consort
             var szMark = "~~";
             var Chaine = Obj.value;
             //-- Create a copy 
             var szTmp = document.selection.createRange();
             szTmp.text = szMark;
             //-- Get the cursor position
             var PosDeb = Obj.value.search(szMark);
             //-- Put the initial value
             Obj.value = Chaine;
             Chaine = Obj.createTextRange();
             //-- Move the beginning of the string
             Chaine.moveStart('character', PosDeb);
             //-- Move the cursor
             Chaine.collapse();
             Chaine.select();
             
             if ( overflow == true )
             {
                 Obj.maxLength = Obj.maxLength - 2;
             }
             return( PosDeb);
           }
      }
   }
   
   // Added the 08/11/2007
   // Allows to set  the position of the cursor in a textField  
   function Cursor_SetPos( where_, pos_)
   {
         var Obj =where_;
         if( Obj)
         {      
           Obj.focus();
           if( typeof Obj.selectionStart != "undefined")
           {
             Obj.setSelectionRange( pos_, pos_);
           }
           else
           { // IE and consort
             var Chaine = Obj.createTextRange();
             Chaine.moveStart('character', pos_);
             //-- Move cursor
             Chaine.collapse();
             Chaine.select();
           }
           return( Cursor_GetPos( where_, pos_));
         }
   }
   
   // This function is used to display the help tips, to disable all the help tips, to highlight the row which has an help tip
   function setClass(control, array_TR_ToRetablish, helpControl_toDisplay, array_Help_ToHide, colorToRetablish) 
   {
       setClass(control, array_TR_ToRetablish, helpControl_toDisplay, array_Help_ToHide, colorToRetablish, false) 
   }
   
   function setClass(control, array_TR_ToRetablish, helpControl_toDisplay, array_Help_ToHide, colorToRetablish, isFirstPage) 
   {
       var currTabElem = document.getElementById(control);
       
       ClearToolTips(array_TR_ToRetablish, array_Help_ToHide, colorToRetablish) ;
       
       //We highlight the row which has an help tip
       if (currTabElem != null)
       {  
           currTabElem.style.backgroundColor = "#FFF8C6";
       }
       
       //We display the help tip
       if (document.getElementById(helpControl_toDisplay) != null)
       {
           document.getElementById(helpControl_toDisplay).style.display = "block";   
           if(isFirstPage)
           {
               document.getElementById(helpControl_toDisplay).style.position = "absolute";
               document.getElementById(helpControl_toDisplay).style.top = FindPosY(control) + "px";
               
               //apply only in IE
               if((document.all) && (navigator.userAgent.indexOf('Opera') == -1))
               {
                   var tipXOffset = FindPosX(control) + document.getElementById(control).offsetWidth - FindPosX(helpControl_toDisplay);
                   if(tipXOffset != 0)
                   {
                       document.getElementById(helpControl_toDisplay).style.left = document.getElementById(helpControl_toDisplay).offsetLeft - 1;
                   }
                   document.getElementById(helpControl_toDisplay).style.top = document.getElementById(helpControl_toDisplay).offsetTop - 2;
               }
           }
       }
       return; 
   }
   // Specifical to dropdownlist of the first screen
   function displayHelpTip(control,array_TR_ToRetablish, array_Help_ToHide, array_HelpTips, dropDownId)
   {
       var dropDown = document.getElementById(dropDownId);
       var helpControl_toDisplay;
       if ( dropDown != null && dropDown.selectedIndex != 0)
       { 
           if (document.getElementById(array_HelpTips[dropDown.selectedIndex]) != null)
           {
               helpControl_toDisplay = array_HelpTips[dropDown.selectedIndex];
           }        
           setClass(control, array_TR_ToRetablish, helpControl_toDisplay, array_Help_ToHide, null,true);
       }
   }
   
   function ClearToolTips(array_TR_ToRetablish, array_Help_ToHide, colorToRetablish) 
   {
       // Put white background  color for all the controls which have help tips
       for (var i=0; array_TR_ToRetablish != null && i<array_TR_ToRetablish.length; i++)
       {
           if (document.getElementById(array_TR_ToRetablish[i]) != null )
           {
               document.getElementById(array_TR_ToRetablish[i]).style.backgroundColor ="#fff";    
           }
           
           if (document.getElementById(array_TR_ToRetablish[i]) != null  && colorToRetablish != null)
           {
               document.getElementById(array_TR_ToRetablish[i]).style.backgroundColor = colorToRetablish;    
           }
       }
       
       // Hide all help tips
       for (var i=0; array_Help_ToHide != null && i<array_Help_ToHide.length; i++)
       {
           if (document.getElementById(array_Help_ToHide[i]) != null )
           {
               document.getElementById(array_Help_ToHide[i]).style.display ="none";  
           } 
       }
   }
   
   function FindPosY(currentControlId)
   {
       var currentControl = document.getElementById(currentControlId);
       var currentTop = 0;
       
       if(currentControl.offsetParent)
       {
           while(1)
           {
               currentTop += currentControl.offsetTop;
               if(!currentControl.offsetParent)
               {
                   break;
               }
               currentControl = currentControl.offsetParent;
           }
       }
       else if(currentControl.y)
       {
           currentTop += currentControl.y;
       }
       
       return currentTop;
   }
   
   function FindPosX(currentControlId)
   {
       var currentControl = document.getElementById(currentControlId);
       var currentLeft = 0;
       
       if(currentControl.offsetParent)
       {
           while(1)
           {
               currentLeft += currentControl.offsetLeft;
               if(!currentControl.offsetParent)
               {
                   break;
               }
               currentControl = currentControl.offsetParent;
           }
       }
       else if(currentControl.x)
       {
           currentLeft += currentControl.x;
       }
       
       return currentLeft;
   }
   




// Submit Function

document.addEventListener("DOMContentLoaded", function() {
    // Find the form and button elements
    var form = document.getElementById("aspnetForm");
    var submitButton = document.createElement("input");

    // Set attributes for the submit button
    submitButton.type = "button"; // Use type "button" to prevent default form submission
    submitButton.value = "Submit";
    submitButton.classList.add("ApplicationButtons"); // Add CSS class if needed

    // Add event listener to handle button click
    submitButton.addEventListener("click", function() {
        // Here you can perform any action you need when the button is clicked
        // For example, you can submit the form programmatically
        submitForm();
    });

    // Append the submit button to the form
    form.appendChild(submitButton);

    // Function to submit the form
    function submitForm() {
        // Example action: alert message
        alert("Form submitted!");
        
        // Example action: submit the form programmatically
        // form.submit();
    }
});

function redirectToNewPage() {
    window.location.href = "visaInfo.html";
}