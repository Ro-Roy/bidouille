#include <stdlib.h>
#include <stdio.h>
#include <curl/curl.h>
#include <netinet/in.h> // For struct in_addr
#include "../include/mbt/net/context.h"

struct mbt_net_context {
    struct mbt_torrent *torrent;  // Pointer to the torrent structure
    struct in_addr ip;            // IP address to bind to
    uint16_t port;                // Port to bind to
    struct mbt_peer **peers;      // NULL-terminated list of pointers to peers
    size_t peer_count;            // Number of peers in the list
    int socket_fd;                // Socket file descriptor for the network operations
};

struct mbt_peer {
    struct in_addr ip;    // IPv4 address of the peer
    uint16_t port;        // Port number the peer is listening on
    int socket_fd;        // File descriptor for the socket connection
    bool is_connected;    // Whether the peer is currently connected
    char peer_id[20];     // 20-byte peer ID, as defined in the BitTorrent protocol
};


struct mbt_net_context *mbt_net_context_init(struct mbt_torrent *t, struct in_addr ip, uint16_t port) {


    struct mbt_net_context *ctx = malloc(sizeof(struct mbt_net_context));
    if (!ctx) {
        return NULL; // Memory allocation failed
    }

    ctx->torrent = t;  // Store torrent information
    ctx->ip = ip;      // Store binding IP
    ctx->port = port;  // Store binding port
    ctx->peers = NULL; // Initialize peers list to NULL

    return ctx;
}

void mbt_net_context_free(struct mbt_net_context *ctx) {
    if (!ctx) return;

    // Free the peers list if it exists
    if (ctx->peers) {
        for (size_t i = 0; ctx->peers[i]; i++) {
            free(ctx->peers[i]);
        }
        free(ctx->peers);
    }

    // Free the context structure itself
    free(ctx);
}

// getter

int mbt_net_contact_tracker(struct mbt_net_context *ctx) {
    if (!ctx) {
        return -1; // Invalid input
    }


    CURL *curl = curl_easy_init();
    if (!curl) {
        return -1; // Failed to initialize libcurl
    }

    char url[512];
    // snprintf(url, sizeof(url), "%s?info_hash=%s&peer_id=-MB2021-&port=%d",
    //          ctx->torrent->announce_url, ctx->torrent->info_hash, ctx->port);

    curl_easy_setopt(curl, CURLOPT_URL, url);
    CURLcode res = curl_easy_perform(curl);
    curl_easy_cleanup(curl);

    if (res != CURLE_OK) {
        return -1; // HTTP request failed
    }

    // Process the response to extract peers (this part depends on your tracker response format)
    // For simplicity, returning a dummy value
    if (!ctx)
        return -1;
    return 5; // Assume 5 peers found
}

void mbt_peer_addr(struct mbt_peer *peer, struct sockaddr_in *addr) {
    if (!peer || !addr) return;

    addr->sin_family = AF_INET;
    addr->sin_addr = peer->ip;
    addr->sin_port = htons(peer->port); // Convert port to network byte order
}

struct mbt_peer **mbt_net_context_peers(struct mbt_net_context *ctx) {

    return ctx->peers;
}

void mbt_leech(struct mbt_net_context *ctx) {
    if (!ctx) return;

    // Contact the tracker
    if (mbt_net_contact_tracker(ctx) < 0) {
        fprintf(stderr, "Failed to contact tracker.\n");
        return;
    }

    // Example of iterating over peers to download blocks
    for (size_t i = 0; ctx->peers && ctx->peers[i]; i++) {
        struct mbt_peer *peer = ctx->peers[i];
        printf("Connecting to peer %s:%d\n", inet_ntoa(peer->ip), ntohs(peer->port));
        // Implement your peer handling and downloading logic here
    }
}