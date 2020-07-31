var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var render = function (component, parentNode) {
    if (typeof component === 'string')
        parentNode.appendChild(document.createTextNode(component));
    if (component.tag) {
        var realEle_1 = document.createElement(component.tag);
        // handle props
        var _a = component.props, children = _a.children, restProps_1 = __rest(_a, ["children"]);
        Object.keys(restProps_1).forEach(function (key) {
            // event
            if (key.substr(0, 2) === 'on') {
                realEle_1.addEventListener(key.toLocaleLowerCase().substr(2), restProps_1[key]);
            }
            realEle_1.setAttribute(key, restProps_1[key]);
        });
        // handle children 
        children.forEach(function (child) {
            render(child, realEle_1);
        });
        return parentNode.appendChild(realEle_1);
    }
};
var React = {
    createElement: function (funcOrTag, props) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var element;
        if (typeof funcOrTag === 'function') {
            element = funcOrTag(props);
        }
        else {
            element = {
                tag: funcOrTag,
                props: __assign(__assign({}, props), { children: children })
            };
        }
        return element;
    }
};
var states = [];
var hookIndex = 0;
var useState = function (initState) {
    var HOOKINDEX = hookIndex;
    var state = states[HOOKINDEX] || initState;
    var setState = function (newState) {
        states[HOOKINDEX] = newState;
        console.log(states);
        rerender();
    };
    hookIndex++;
    return [state, setState];
};
var rerender = function () {
    hookIndex = 0;
    var mountNode = document.getElementById('root');
    mountNode.innerHTML = '';
    render(React.createElement(App, null), mountNode);
};
var App = function () {
    var _a = useState('red'), color = _a[0], setColor = _a[1];
    var _b = useState('react'), name = _b[0], setName = _b[1];
    return (React.createElement("div", null,
        React.createElement("div", { style: "background:" + color + ";width:300;height:300", onClick: function () { return setColor('green'); } }),
        "hi ",
        React.createElement("span", null, name),
        React.createElement("input", { type: "text", onChange: function (e) { return setName(e.target.value); }, value: name })));
};
render(React.createElement(App, null), document.getElementById('root'));
