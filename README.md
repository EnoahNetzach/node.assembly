### Install

```bash
npm install
```

### Try it out

```bash
npm start
```

then, when prompted, insert a number greater than 1, and then insert this program:

```assembly
# start
beg:
  tge acc 1
- mov 1 acc
+ jmp slp
  slp 1
  add x0
# restart
  jmp beg
slp: add 40
  slp acc
```
