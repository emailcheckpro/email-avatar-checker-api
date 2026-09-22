package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	key := os.Getenv("EMAILCHECKPRO_API_KEY")
	if key == "" {
		panic("Set EMAILCHECKPRO_API_KEY")
	}
	body := []byte("{\"service_type\":\"email_avatar\",\"identifier\":\"alex.kim@gmail.com\"}")
	req, _ := http.NewRequest("POST", "https://emailcheckpro.com/api/v1/check", bytes.NewReader(body))
	req.Header.Set("X-API-Key", key)
	req.Header.Set("Content-Type", "application/json")
	r, e := http.DefaultClient.Do(req)
	if e != nil {
		panic(e)
	}
	defer r.Body.Close()
	b, _ := io.ReadAll(r.Body)
	if r.StatusCode >= 300 {
		panic(string(b))
	}
	fmt.Println(string(b))
}
