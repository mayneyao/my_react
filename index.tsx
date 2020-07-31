const render = (component, parentNode) => {
  if (typeof component === 'string') parentNode.appendChild(document.createTextNode(component))

  if (component.tag) {
    const realEle = document.createElement(component.tag);
    // handle props
    const { children, ...restProps } = component.props;

    Object.keys(restProps).forEach(key => {
      // event
      if (key.substr(0, 2) === 'on') {
        realEle.addEventListener(key.toLocaleLowerCase().substr(2), restProps[key])
      }
      realEle.setAttribute(key, restProps[key])
    });
    // handle children 
    children.forEach(child => {
      render(child, realEle);
    })
    return parentNode.appendChild(realEle)
  }
}

const React = {
  createElement: (funcOrTag, props, ...children) => {
    let element;
    if (typeof funcOrTag === 'function') {
      element = funcOrTag(props)
    } else {
      element = {
        tag: funcOrTag,
        props: {
          ...props,
          children
        }
      }
    }
    return element
  }
};


const states = [];
let hookIndex = 0;

const useState = (initState) => {
  const HOOKINDEX = hookIndex;
  let state = states[HOOKINDEX] || initState;
  const setState = (newState) => {
    states[HOOKINDEX] = newState
    console.log(states)
    rerender()
  };
  hookIndex++;
  return [state, setState]
}

const rerender = () => {
  hookIndex = 0;
  const mountNode = document.getElementById('root');
  mountNode.innerHTML = '';
  render(<App />, mountNode)
}

const App = () => {
  const [color, setColor] = useState('red');
  const [name, setName] = useState('react');
  return (
    <div>
      <div style={`background:${color};width:300;height:300`} onClick={() => setColor('green')}>
      </div>
      hi <span>{name}</span>
      <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
    </div>
  )
}

render(<App />, document.getElementById('root'))