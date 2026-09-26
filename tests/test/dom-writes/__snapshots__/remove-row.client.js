// 13:10
($splice0, $tag1) => {
    const ids = $splice0()([1, 2, 3, 4, 5]);
    return (<table>
        <tbody>
          <$tag1 each={ids[0]()}>
            {(id) => (<tr id={"row-" + id}>
                <td>
                  <button onclick={() => ids[1](ids[0]().filter((each) => each !== id))}>
                    {"remove " + id}
                  </button>
                </td>
              </tr>)}
          </$tag1>
        </tbody>
      </table>);
}
