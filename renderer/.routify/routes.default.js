// @ts-nocheck


export const routes = {
  "meta": {},
  "id": "_default",
  "name": "",
  "file": {
    "path": "src/routes",
    "dir": "src",
    "base": "routes",
    "ext": "",
    "name": "routes"
  },
  "rootName": "default",
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {},
      "id": "_default_tagging",
      "name": "tagging",
      "module": false,
      "file": {
        "path": "src/routes/tagging",
        "dir": "src/routes",
        "base": "tagging",
        "ext": "",
        "name": "tagging"
      },
      "children": [
        {
          "meta": {},
          "id": "_default_tagging_Upload_svelte",
          "name": "Upload",
          "file": {
            "path": "src/routes/tagging/Upload.svelte",
            "dir": "src/routes/tagging",
            "base": "Upload.svelte",
            "ext": ".svelte",
            "name": "Upload"
          },
          "asyncModule": () => import('../src/routes/tagging/Upload.svelte'),
          "children": []
        },
        {
          "meta": {
            "dynamic": true,
            "order": false
          },
          "id": "_default_tagging__uid__svelte",
          "name": "[uid]",
          "file": {
            "path": "src/routes/tagging/[uid].svelte",
            "dir": "src/routes/tagging",
            "base": "[uid].svelte",
            "ext": ".svelte",
            "name": "[uid]"
          },
          "asyncModule": () => import('../src/routes/tagging/[uid].svelte'),
          "children": []
        },
        {
          "meta": {
            "isDefault": true
          },
          "id": "_default_tagging_index_svelte",
          "name": "index",
          "file": {
            "path": "src/routes/tagging/index.svelte",
            "dir": "src/routes/tagging",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "asyncModule": () => import('../src/routes/tagging/index.svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_test",
      "name": "test",
      "module": false,
      "file": {
        "path": "src/routes/test",
        "dir": "src/routes",
        "base": "test",
        "ext": "",
        "name": "test"
      },
      "children": [
        {
          "meta": {},
          "id": "_default_test_Test_svelte",
          "name": "Test",
          "file": {
            "path": "src/routes/test/Test.svelte",
            "dir": "src/routes/test",
            "base": "Test.svelte",
            "ext": ".svelte",
            "name": "Test"
          },
          "asyncModule": () => import('../src/routes/test/Test.svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {
        "dynamic": true,
        "dynamicSpread": true,
        "order": false,
        "inline": false
      },
      "name": "[...404]",
      "file": {
        "path": ".routify/components/[...404].svelte",
        "dir": ".routify/components",
        "base": "[...404].svelte",
        "ext": ".svelte",
        "name": "[...404]"
      },
      "asyncModule": () => import('./components/[...404].svelte'),
      "children": []
    }
  ]
}
export default routes