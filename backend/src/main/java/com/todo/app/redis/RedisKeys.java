package com.todo.app.redis;

public final class RedisKeys {
    private RedisKeys() {}

    public static final String SESSION_PREFIX = "session:";
    public static final String CACHE_TODO_ALL = "cache:todo:all";
    public static final String CACHE_TODO_BY_ID = "cache:todo:byId";
}
