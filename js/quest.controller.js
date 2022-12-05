'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // DONE: hide the game-start section
  $('.game-start').hide()
  renderQuest()
  // done: show the quest section
  $('.quest').show()
}

function renderQuest() {
  // done: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(gCurrQuest.txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans

  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.alert-success').show()
      $('.quest').hide()
      $('.game-start').show()
      onRestartGame()

      // TODO: improve UX
    } else {
      $('.quest').hide()
      $('.alert-warning').show()
      $('.new-quest').show()
    }
  } else {
    // done: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()

  var newGuess = $('#newGuess').val()
  console.log('newGuess:', newGuess)
  var newQuest = $('#newQuest').val()
  console.log('newQuest:', newQuest)

  addGuess(newQuest, newGuess, gLastRes)

  // done: Get the inputs' values
  // done: Call the service addGuess

  onRestartGame()
}

function onRestartGame() {

  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null
  init()
}
