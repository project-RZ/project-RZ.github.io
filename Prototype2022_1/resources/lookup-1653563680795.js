(function(window, undefined) {
  var dictionary = {
    "6628dcc3-b0d9-4240-9376-201120b603c8": "Employer Projects",
    "e1a0c7d6-e2d2-4af8-86f0-47e958a14dd5": "Post A Video",
    "5f7c7a1f-a824-41cb-853f-0a98ae9ff257": "Employer Find A Match - slide 2",
    "45a4e4ab-4a87-4849-ac9c-47b07e6608b5": "Employer Find A Match",
    "ef11ab36-a40d-4ac7-8b8f-d2851a886c88": "Seeker Find A Project - Page 3",
    "d4ea6111-7622-469f-bb05-87c19394d111": "Seeker Find A Project - Page 2",
    "90c870d8-6f4b-424f-8309-e4c8b34e7f06": "Seeker Profile",
    "f05854c1-c5e5-4bcb-919d-930ce25f617e": "Add Project",
    "ebc46772-e8a2-4bc8-bb35-c024d54c3287": "seeker Application Message",
    "a28b72ac-d685-4ea0-80af-237eaec42aa1": "Employer Find A Match - Slide 3",
    "3499e930-45e1-4102-8f3f-7e6e0c4e758e": "Who Are You?",
    "a4f7364b-7c04-459f-a1e6-ee96c45c7e96": "Seeker Applied",
    "5843de16-4673-471a-95e2-df9ce19becc6": "Application Message",
    "6bb97e9b-a323-433f-86fc-bec90a509aa2": "Seeker Find A Project",
    "fcc0f5d4-b257-4079-be50-6806651133e6": "Employer Connections",
    "d4881cfc-b4f7-4ee3-a689-d7cd00d4717d": "Add Company",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "Main",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);