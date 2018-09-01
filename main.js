var timer;
var $win = $(window);
var counter = 0;

$("#cy").height($win.height());
$("#cy").width($win.width());

var cy = cytoscape({
  container: document.getElementById("cy"), // container to render in

  elements: [
    // list of graph elements to start with
    {
      // node a
      data: { id: "a", value: 0 }
    },
    {
      // node b
      data: { id: "b", value: 3 }
    },
    {
      // node c
      data: { id: "c", value: 0 }
    },
    {
      // node d
      data: { id: "d", value: -2 }
    },
    {
      // node e
      data: { id: "e", value: 0 }
    },
    {
      // edge ab
      data: { id: "ab", source: "a", target: "b" }
    },
    {
      // edge bd
      data: { id: "bd", source: "b", target: "d" }
    },
    {
      // edge be
      data: { id: "be", source: "b", target: "e" }
    },
    {
      // edge cd
      data: { id: "cd", source: "c", target: "d" }
    },
    {
      // edge de
      data: { id: "de", source: "d", target: "e" }
    }
  ],

  style: [
    // the stylesheet for the graph
    {
      selector: "node",
      style: {
        "text-valign": "center",
        "text-halign": "center",
        "background-color": "#666",
        label: "data(value)"
      }
    },
    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle"
      }
    },
    {
      selector: ".negative",
      style: {
        "background-color": "red",
        label: "data(value)"
      }
    },
    {
      selector: ".positive",
      style: {
        "background-color": "green",
        label: "data(value)"
      }
    },
    {
      selector: ".nolabel",
      style: {
        content: ""
      }
    }
  ],

  layout: {
    name: "grid",
    rows: 3
  },
  autoungrabify: true,
  userZoomingEnabled: false,
  panningEnabled: true,
  userPanningEnabled: false
});

$win.on("resize", function() {
  clearTimeout(timer);
  timer = setTimeout(function() {
    $("#cy").height($win.height());
    $("#cy").width($win.width());
    cy.reset();
    cy.resize();
    cy.fit();
  }, 200);
});

cy.on("tap", "node", function(evt) {
  counter++;
  var node = evt.target;
  transfer(node);
  check(node);

  var nodes = cy.filter("node").select();
  var won = true;
  nodes.forEach(element => {
    if (element.hasClass("negative")) {
      won = false;
    }
  });
  if (won) {
    alert("Congratulations you won after " + counter + " clicks");
  }
});

function check(node) {
  if (node.data("value") >= 0) {
    node.classes("positive");
  } else {
    node.classes("negative");
  }
}

function transfer(node) {
  var nodes = node.openNeighborhood("node");
  nodes.forEach(element => {
    element.data("value", element.data("value") + 1);
    node.data("value", node.data("value") - 1);
    check(element);
  });
}
