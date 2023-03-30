import { currentNode } from "./if_nodemap.js";

function loadDomFromNode(node) {
  let name = node.name;
  let location = node.location;
  let visibility = node.visibility;
  let points = node.points;
  let nodeDirections = node.directions;
  let descriptions = node.description;
  let items = node.items;
  let containers = node.containers;
  let actions = node.actions;
  let win = node.win;
  let lose = node.lose;
  let hint = node.hint;

  //clear current dynamic dom elements
  let dirInputs = $("#directions").find("input");
  for (let input of dirInputs) {
    $(input).prop("checked", false);
  }
  $("#editDirections").empty();
  $("#evoListDescriptions").empty();
  $("#itemList").empty();
  $("#containerList").empty();
  $("#actionList").empty();

  //add node elements
  $("#location").html(location.toString());

  $("#name").val(name);

  if (visibility === "true") {
    $("#visibility").prop("checked", true);
  } else {
    $("#visibility").prop("checked", false);
  }

  $("#points").val(points);

  for (let i = 0; i < nodeDirections.length; i++) {
    let checkbox = nodeDirections[i].direction;
    $(`#${checkbox}`).prop("checked", true);
  }
  directions(dirInputs);
  for (let i = 0; i < nodeDirections.length; i++) {
    let checkbox = nodeDirections[i].direction;
    $(`#${checkbox}_Location`).val(nodeDirections[i].location);
    $(`#${checkbox}_Alternatives`).val(nodeDirections[i].alternatives);
    if (nodeDirections[i].exclude === "true") {
      $(`#${checkbox}_Exclude`).prop("checked", true);
    } else {
      $(`#${checkbox}_Exclude`).prop("checked", false);
    }
    $(`#${checkbox}_Items`).val(nodeDirections[i].reqItems);
    $(`#${checkbox}_Containers`).val(nodeDirections[i].reqContainers);
    $(`#${checkbox}_Local`).val(nodeDirections[i].reqLocal);
    $(`#${checkbox}_Global`).val(nodeDirections[i].reqGlobal);
    $(`#${checkbox}_Visits`).val(nodeDirections[i].locVisits);
    $(`#${checkbox}_Evos`).val(nodeDirections[i].itemEvos);
  }

  $("#defaultDes").val(descriptions.defaultDes);
  $("#basicDes").val(descriptions.basicDes);
  if ("evos" in descriptions) {
    for (let i = 0; i < descriptions.evos.length; i++) {
      addEvo("evoListDescriptions");
      let baseId = `evoDes_${i + 1}`;
      $(`#${baseId}_Items`).val(descriptions.evos[i].reqItems);
      $(`#${baseId}_Containers`).val(descriptions.evos[i].reqContainers);
      $(`#${baseId}_Local`).val(descriptions.evos[i].reqLocal);
      $(`#${baseId}_Global`).val(descriptions.evos[i].reqGlobal);
      $(`#${baseId}_Visits`).val(descriptions.evos[i].locVisits);
      $(`#${baseId}_Evos`).val(descriptions.evos[i].itemEvos);
      $(`#${baseId}_Des`).val(descriptions.evos[i].evoDes);
    }
  }

  for (let i = 0; i < items.length; i++) {
    addItem();
    let baseId = `item_${i + 1}`;
    $(`#${baseId}_Name`).val(items[i].name);
    $(`#${baseId}_Des`).val(items[i].description);
    $(`#${baseId}_Points`).val(items[i].points);
    $(`#${baseId}_Items`).val(items[i].reqItems);
    $(`#${baseId}_Containers`).val(items[i].reqContainers);
    $(`#${baseId}_Local`).val(items[i].reqLocal);
    $(`#${baseId}_Global`).val(items[i].reqGlobal);
    $(`#${baseId}_Visits`).val(items[i].locVisits);
    $(`#${baseId}_EvoList`).val(items[i].itemEvos);
    for (let j = 0; j < items[i].evos.length; j++) {
      addEvo(`${baseId}_EvoList`);
      let baseEvoId = `evoItems_${j + 1}`;
      $(`#${baseEvoId}_Items`).val(items[i].evos[j].reqItems);
      $(`#${baseEvoId}_Containers`).val(items[i].evos[j].reqContainers);
      $(`#${baseEvoId}_Local`).val(items[i].evos[j].reqLocal);
      $(`#${baseEvoId}_Global`).val(items[i].evos[j].reqGlobal);
      $(`#${baseEvoId}_Visits`).val(items[i].evos[j].locVisits);
      $(`#${baseEvoId}_Evos`).val(items[i].evos[j].itemEvos);
      $(`#${baseEvoId}_Des`).val(items[i].evos[j].evoDes);
    }
  }

  for (let i = 0; i < containers.length; i++) {
    addContainer();
    let baseId = `container_${i + 1}`;
    $(`#${baseId}_Name`).val(containers[i].name);
    $(`#${baseId}_Capacity`).val(containers[i].capacity);
    $(`#${baseId}_Illegal`).val(containers[i].illegal);
    $(`#${baseId}_Complete`).val(containers[i].complete);
    $(`#${baseId}_Items`).val(containers[i].reqItems);
    $(`#${baseId}_Containers`).val(containers[i].reqContainers);
    $(`#${baseId}_Local`).val(containers[i].reqLocal);
    $(`#${baseId}_Global`).val(containers[i].reqGlobal);
    $(`#${baseId}_Visits`).val(containers[i].locVisits);
    $(`#${baseId}_Evos`).val(containers[i].itemEvos);
  }

  $("#invalidAction").val(actions.invalid);
  if ("actions" in actions) {
    for (let i = 0; i < actions.actions.length; i++) {
      addAction();
      let baseId = `action_${i + 1}`;
      $(`#${baseId}_Actions`).val(actions.actions[i].actions);
      $(`#${baseId}_Max`).val(actions.actions[i].max);
      $(`#${baseId}_Costs`).val(actions.actions[i].costs);
      $(`#${baseId}_Drops`).val(actions.actions[i].drops);
      $(`#${baseId}_Visibility`).val(actions.actions[i].visibility);
      $(`#${baseId}_Response`).val(actions.actions[i].response);
      $(`#${baseId}_Fail`).val(actions.actions[i].fail);
      $(`#${baseId}_Points`).val(actions.actions[i].points);
      $(`#${baseId}_Items`).val(actions.actions[i].reqItems);
      $(`#${baseId}_Containers`).val(actions.actions[i].reqContainers);
      $(`#${baseId}_Local`).val(actions.actions[i].reqLocal);
      $(`#${baseId}_Global`).val(actions.actions[i].reqGlobal);
      $(`#${baseId}_Visits`).val(actions.actions[i].locVisits);
      $(`#${baseId}_Evos`).val(actions.actions[i].itemEvos);
    }
  }

  $("#winDes").val(win.description);
  $("#win_Items").val(win.reqItems);
  $("#win_Containers").val(win.reqContainers);
  $("#win_Local").val(win.reqLocal);
  $("#win_Global").val(win.reqGlobal);
  $("#win_Visits").val(win.locVisits);
  $("#win_Evos").val(win.itemEvos);

  $("#loseDes").val(lose.description);
  $("#lose_Items").val(lose.reqItems);
  $("#lose_Containers").val(lose.reqContainers);
  $("#lose_Local").val(lose.reqLocal);
  $("#lose_Global").val(lose.reqGlobal);
  $("#lose_Visits").val(lose.locVisits);
  $("#lose_Evos").val(lose.itemEvos);

  $("#hint").val(hint);
}

function directions(inputs) {
  for (let input of inputs) {
    let inputId = $(input).attr("id");
    let nextLoc;
    let curLoc = currentNode.split(",");
    switch (inputId) {
      case "N":
        nextLoc = `${curLoc[0]},${+curLoc[1] + 1},${curLoc[2]}`;
        break;
      case "NE":
        nextLoc = `${+curLoc[0] + 1},${+curLoc[1] + 1},${curLoc[2]}`;
        break;
      case "E":
        nextLoc = `${+curLoc[0] + 1},${curLoc[1]},${curLoc[2]}`;
        break;
      case "SE":
        nextLoc = `${+curLoc[0] + 1},${+curLoc[1] - 1},${curLoc[2]}`;
        break;
      case "S":
        nextLoc = `${curLoc[0]},${+curLoc[1] - 1},${curLoc[2]}`;
        break;
      case "SW":
        nextLoc = `${+curLoc[0] - 1},${+curLoc[1] - 1},${curLoc[2]}`;
        break;
      case "W":
        nextLoc = `${+curLoc[0] - 1},${curLoc[1]},${curLoc[2]}`;
        break;
      case "NW":
        nextLoc = `${+curLoc[0] - 1},${+curLoc[1] + 1},${curLoc[2]}`;
        break;
      case "Up":
        nextLoc = `${curLoc[0]},${curLoc[1]},${+curLoc[2] + 1}`;
        break;
      case "Down":
        nextLoc = `${curLoc[0]},${curLoc[1]},${+curLoc[2] - 1}`;
        break;
      default:
        nextLoc = "";
        break;
    }
    if ($(input).is(":checked")) {
      if (!$(`#${inputId}_Edit`).length) {
        let newDivId = `${inputId}_Edit`;
        let newDivStart = `<div class='blockElements' id='${newDivId}'>`;
        let newDivEnd = "</div>";
        let direction = `<span class='centerText'><b>${inputId}</b></span>`;
        let divLocLabel = `
                          <details>
                          <summary>Location</summary>
                          <span>Location of the destination node (defaults to direction clicked, but may be edited)</span>
                          </details>`;
        let divLoc = `<input value='${nextLoc}' id='${inputId}_Location' type='text'>`;
        let divAltLabel = `
                          <details>
                          <summary>Alternatives</summary>
                          <span>Comma separated alternatives to "go ${inputId}"" (e.g. "follow narrow path, take narrow path, take path, etc.")</span>
                          </details>`;
        let divAlt = `<input id='${inputId}_Alternatives' type='text'>`;
        let excludeDefaults = `<label class='pure-checkbox tooltip'>
                              <details>                      
                              <summary>Exclude Defaults</summary>
                              <span>If checked, the default "go ${inputId}" (and equivalents) will not work</span>
                              </details>
                              <input type='checkbox' id='${inputId}_Exclude'/>`;
        let requirements = getRequirements(inputId);

        let html =
          newDivStart +
          direction +
          divLocLabel +
          divLoc +
          divAltLabel +
          divAlt +
          excludeDefaults +
          requirements +
          newDivEnd;

        $("#editDirections").append(html);
      }
    } else {
      $(`#${inputId}_Edit`).remove();
    }
  }
}

function addItem() {
  let length = $("#itemList").children().length;
  let itemId;
  if (length >= 1) {
    let lastId = +$("#itemList").children().last().attr("id").split("_")[1];
    itemId = `item_${lastId + 1}`;
  } else {
    itemId = "item_1";
  }
  let newDivStart = `<div class='blockElements' id='${itemId}'>`;
  let newDivEnd = "</div>";
  let rmvButton = "<button class='removeObject'>Remove Item</button>";
  let nameLabel = `
  <details>
                    <summary>Name</summary>
                    <span>Comma separated names of item [first option has requirement precedence] (e.g. lantern, light, torch)</span>
                    </details>`;
  let name = `<input type='text' id='${itemId}_Name'>`;
  let desLabel = `
  <details>
                    <summary>Description</summary>
                    <span>Description of item (for "examine {item}" or "look {item}" command)</span>
                    </details>`;
  let des = `<textarea id='${itemId}_Des' rows='3' cols='23'></textarea>`;
  let pointsLabel = `
  <details>
                    <summary>Points</summary>
                        <span>Number of points awarded for getting this item [default of 0]</span>
                        </details>`;
  let points = `<input type='text' id='${itemId}_Points'>`;
  let requirements = getRequirements(itemId);
  let evoButton = "<button class='addEvoItems'>Add Evolution</button>";
  let evoListDiv = `<div id='${itemId}_EvoList'></div>`;
  let html =
    newDivStart +
    rmvButton +
    nameLabel +
    name +
    desLabel +
    des +
    pointsLabel +
    points +
    requirements +
    evoButton +
    evoListDiv +
    newDivEnd;

  $("#itemList").append(html);
}

function addContainer() {
  let length = $("#containerList").children().length;
  let containerId;
  if (length >= 1) {
    let lastId = +$("#containerList")
      .children()
      .last()
      .attr("id")
      .split("_")[1];
    containerId = `container_${lastId + 1}`;
  } else {
    containerId = "container_1";
  }
  let newDivStart = `<div class='blockElements' id='${containerId}'>`;
  let newDivEnd = "</div>";
  let rmvButton = "<button class='removeObject'>Remove Container</button>";
  let nameLabel = `
  <details>
                    <summary>Name</summary>
                    <span>Comma separated names of this container [first option has requirement precedence] (e.g. box, bin, cardboard box)</span>
                    </details>`;
  let name = `<input type='text' id='${containerId}_Name'>`;
  let capLabel = `
  <details>
                    <summary>Capacity</summary>
                    <span>Max number of items the container can hold (leave empty for no limit)</span>
                    </details>`;
  let cap = `<input type='text' id='${containerId}_Capacity'>`;
  let completeLabel = `
  <details>
                    <summary>Completed Contents</summary>
                    <span>Either a number OR a comma separated list of items - Returns true if contents are >=
                    the number OR if every listed item is present</span>
                    </details>`;
  let complete = `<input type='text' id='${containerId}_Complete'>`;
  let illegalLabel = `
  <details>
                    <summary>Illegal Items</summary>
                    <span>Comma separated list of items which may not be deposited into container</span>
                    </details>`;
  let illegal = `<input type='text' id='${containerId}_Illegal'>`;
  let requirements = getRequirements(containerId);
  let html =
    newDivStart +
    rmvButton +
    nameLabel +
    name +
    capLabel +
    cap +
    completeLabel +
    complete +
    illegalLabel +
    illegal +
    requirements +
    newDivEnd;

  $("#containerList").append(html);
}

function addAction() {
  let length = $("#actionList").children().length;
  let actionId;
  if (length >= 1) {
    let lastId = +$("#actionList").children().last().attr("id").split("_")[1];
    actionId = `action_${lastId + 1}`;
  } else {
    actionId = "action_1";
  }
  let newDivStart = `<div class='blockElements' id='${actionId}'>`;
  let newDivEnd = "</div>";
  let rmvButton = `<button class='removeObject'>Remove Action</button>`;
  let actionLabel = `
  <details>
                        <summary>Action(s)</summary>
                        <span>Comma separated list of accepted action(e.g. crush egg, smash egg) [Ignores: a, an, the, to, for, at]</span>
                        </details>`;
  let actions = `<input type='text' id='${actionId}_Actions'>`;
  let maxLabel = `
  <details>
                    <summary>Max Uses</summary>
                    <span>A number for the maximum number of times this action can be called [leave blank for no maximum]</span>
                    </details>`;
  let max = `<input type='text' id='${actionId}_Max'>`;
  let costsLabel = `
  <details>
                    <summary>Costs</summary>
                    <span>Comma separated list of items which are spent/destroyed to perform this action</span>
                    </details>`;
  let costs = `<input type='text' id='${actionId}_Costs'>`;
  let dropsLabel = `
  <details>
                    <summary>Drops</summary>
                    <span>Comma separated list of items which are dropped to perform this action</span>
                    </details>`;
  let drops = `<input type='text' id='${actionId}_Drops'>`;
  let visibilityLabel = `
  <details>
                        <summary>Visibility</summary>
                        <span>Selection for how this action affects this node's visibility</span>
                        </details>`;
  let visibility = `<select id='${actionId}_Visibility'>
                        <option value='none' seleted='selected'>No change</option>
                        <option value='on'>On</option>
                        <option value='off'>Off</option>
                        <option value='switch'>Switch</option>
                        </select>`;
  let responseLabel = `
  <details>
                        <summary>Action Response</summary>
                        <span>Text displayed after successfully calling this action (e.g. The egg is now broken.)</span>
                        </details>`;
  let response = `<textarea id='${actionId}_Response' rows='3' cols='23'></textarea>`;
  let failLabel = `
  <details>
                        <summary>Fail Response</summary>
                        <span>Text displayed after not meeting the action requirements (e.g. This door requires a key.)</span>
                        </details>`;
  let fail = `<textarea id='${actionId}_Fail' rows='3' cols='23'></textarea>`;
  let pointsLabel = `
  <details>
                    <summary>Points</summary>
                    <span>Points awarded for successfully calling this action [default of 0]</span>
                    </details>`;
  let points = `<input type='text' id='${actionId}_Points'>`;
  let requirements = getRequirements(actionId);

  let html =
    newDivStart +
    rmvButton +
    actionLabel +
    actions +
    maxLabel +
    max +
    costsLabel +
    costs +
    dropsLabel +
    drops +
    visibilityLabel +
    visibility +
    responseLabel +
    response +
    failLabel +
    fail +
    pointsLabel +
    points +
    requirements +
    newDivEnd;

  $("#actionList").append(html);
}

function showHide(ID) {
  let block;
  switch (ID) {
    case "directionsBlockBtn":
      block = "directionsBlock";
      break;
    case "descriptionsBlockBtn":
      block = "descriptionsBlock";
      break;
    case "itemsBlockBtn":
      block = "itemsBlock";
      break;
    case "actionsBlockBtn":
      block = "actionsBlock";
      break;
    case "winBlockBtn":
      block = "winBlock";
      break;
    case "loseBlockBtn":
      block = "loseBlock";
      break;
    case "hintBlockBtn":
      block = "hintBlock";
      break;
    case "containersBlockBtn":
      block = "containersBlock";
      break;
    default:
      break;
  }
  if (block) {
    let menus = [
      "directionsBlock",
      "descriptionsBlock",
      "itemsBlock",
      "actionsBlock",
      "winBlock",
      "loseBlock",
      "hintBlock",
      "containersBlock",
    ];

    for (let menu of menus) {
      if (menu !== block) {
        let x = $(`#${menu}`)[0];
        x.style.display = "none";
      } else {
        let x = $(`#${menu}`)[0];
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }
    }
  }
}

function addEvo(listId) {
  let length = $(`#${listId}`).children().length;
  let evoId;
  if (listId.includes("evoListDescriptions")) {
    if (length >= 1) {
      let lastId = +$(`#${listId}`).children().last().attr("id").split("_")[1];
      evoId = `evoDes_${lastId + 1}`;
    } else {
      evoId = "evoDes_1";
    }
  } else if (listId.includes("_EvoList")) {
    if (length >= 1) {
      let lastId = +$(`#${listId}`).children().last().attr("id").split("_")[1];
      evoId = `evoItems_${lastId + 1}`;
    } else {
      evoId = "evoItems_1";
    }
  } else {
    evoId = "undefined";
  }
  let newDivStart = `<div class='blockElements' id='${evoId}'>`;
  let evoHeading = `<label><b>Evolution</b></label>`;
  let requirements = getRequirements(evoId);
  let evoDesLabel = `
  <details>
  <summary class="boldAccordion">Evo Description</summary>
  <span>The text displayed for this setting after meeting the above requirements</span>
  </details>`;
  let evoDes = `<textarea id='${evoId}_Des' rows='4' cols='23'></textarea>`;
  let rmvButton = `<button class='removeEvo'>Remove Evolution</button>`;
  let newDivEnd = "</div>";

  let html =
    newDivStart +
    evoHeading +
    requirements +
    evoDesLabel +
    evoDes +
    rmvButton +
    newDivEnd;

  $(`#${listId}`).append(html);
}

function getRequirements(baseId) {
  let reqLabel = `
  <details>
          <summary class="boldAccordion">Requirements</summary>
          <span>The current node setting will only exist/apply if the following conditions are met</span>
  </details>`;
  let reqItems = `
  <details>
          <summary>Items</summary>
          <span>Comma separated items required for this setting (e.g. keys, bottle, food, etc.)</span>
  </details>
                    <input id='${baseId}_Items' type='text'>`;
  let reqContainers = `
  <details>
          <summary>Containers</summary>
          <span>Comma separated containers required to be "complete" for this setting</span>
  </details>
                        <input id='${baseId}_Containers' type='text'>`;
  let reqLocal = `
  <details>
          <summary>Local Actions</summary>
          <span>Comma separated actions which the player is required to have entered in this node location (e.g. unlock gate, break window)</span>
  </details>
                    <input id='${baseId}_Local' type='text'>`;
  let reqGlobal = `
  <details>
          <summary>Global Actions</summary>
          <span>Comma separated actions which the player is required to have entered in any node (e.g. abracadabra, forge key)</span>
  </details>
                    <input id='${baseId}_Global' type='text'>`;
  let reqVisits = `
  <details>
          <summary>Node Visits</summary>
          <span>Comma separated list of locations and required number of visits to each (in form of [location, visits]) (e.g. [0,0,0,1], [0,2,0,1], [2,3,0,1])</span>
  </details>
          <input id='${baseId}_Visits' type='text'>`;
  let reqEvos = `
  <details>
          <summary>Item Evos</summary>
          <span>Comma separated list of items and the required evolution stage for each (e.g. [key, 1], [knife, 2])</span>
  </details>
  <input id ='${baseId}_Evos' type='text'>`;

  let html =
    reqLabel +
    reqItems +
    reqContainers +
    reqLocal +
    reqGlobal +
    reqVisits +
    reqEvos;
  return html;
}

function removeEvo(evoList, evoId) {
  $(`#${evoList}`).find(`#${evoId}`).first().remove();
}

function removeObject(objectId) {
  $(`#${objectId}`).remove();
}

export {
  directions,
  addItem,
  addContainer,
  addAction,
  showHide,
  addEvo,
  getRequirements,
  removeEvo,
  removeObject,
  loadDomFromNode,
};
